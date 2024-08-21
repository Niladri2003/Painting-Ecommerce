package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/pkg/utils"
	"github.com/niladri2003/PaintingEcommerce/platform/cache"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
)

// Define the sessionStore as a sync.Map (thread-safe map)
var sessionStore sync.Map

func UserSignUp(c *fiber.Ctx) error {
	//Create a new user auth struct
	signUp := &models.SignUp{}

	//Checking received data from JSON body.
	if err := c.BodyParser(signUp); err != nil {
		//Return status 400 and error message
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
			"error":   true,
		})
	}
	fmt.Printf("Parsed sign-up data: %+v\n", signUp)
	fmt.Println("Email=>", signUp.Email)

	////Create a new validator for User model.
	//validate := utils.NewValidator()
	//
	////Validate sign up fields.
	//if err := validate.Struct(signUp); err != nil {
	//	// Log validation errors for debugging
	//	fmt.Printf("Validation errors: %+v\n", utils.ValidatorErrors(err))
	//	//Return if some fields are not valid
	//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	//		"error": true,
	//		"msg":   utils.ValidatorErrors(err),
	//	})
	//}
	//Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}
	//Checking role from signup Data
	role, err := utils.VerifyRole(signUp.UserRole)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}
	fmt.Println("HashPassword=>", utils.GeneratePassword(signUp.Password))
	//Create a new user struct
	user := &models.User{}

	//Set initialized default data for user:
	user.ID = uuid.New()
	user.FirstName = signUp.FirstName
	user.LastName = signUp.LastName
	user.Email = signUp.Email
	user.CreatedAt = time.Now()
	user.PasswordHash = utils.GeneratePassword(signUp.Password)
	user.UserStatus = 1 // 0==Not verified, 1==Verified TODO do email otp verification for verified accouts
	user.UserRole = role

	//validate user fields

	//if err := validate.Struct(user); err != nil {
	//	//Return if some fields are not valid.
	//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	//		"error": true,
	//		"msg":   utils.ValidatorErrors(err),
	//	})
	//}

	// Create a new user with validated data.
	if err := db.CreateUser(user); err != nil {
		// Return status 500 and create user process error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}
	// Delete password hash field from JSON view.
	user.PasswordHash = ""

	cart := &models.Cart{
		ID:                  uuid.New(),
		UserID:              user.ID,
		IsCouponCodeApplied: false,
		CouponCode:          "",
		Discountpercentage:  0.0,
		CreatedAt:           time.Now(),
		UpdatedAt:           time.Now(),
	}

	if err := db.CreateCart(cart); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	// Return status 200 OK.
	return c.JSON(fiber.Map{
		"error":   false,
		"msg":     nil,
		"user":    user,
		"cart_id": cart.ID.String(),
	})
}

func UserSignIn(c *fiber.Ctx) error {
	//Create a new user auth struct
	signIn := &models.SignIn{}

	if err := c.BodyParser(signIn); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}
	//fmt.Printf("Parsed sign-in data: %+v\n", signIn)
	//create a database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}
	//Get user by email
	// fmt.Printf("Email", signIn.Email)

	foundedUser, err := db.GetUserByEmail(signIn.Email)
	//fmt.Println(foundedUser)
	if err != nil {
		// Return, if user not found.
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   "user with the given email is not found",
		})
	}
	// Compare given user password with stored in found user.
	//compareUserPassword := utils.ComparePasswords(foundedUser.PasswordHash, signIn.Password)
	err = bcrypt.CompareHashAndPassword([]byte(foundedUser.PasswordHash), []byte(signIn.Password))
	if err != nil {
		//Return, if password is not incorrect
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "wrong user email address or password",
		})
	}
	// Get role credentials from founded user.
	//userRole := foundedUser.UserRole.String()
	// Generate a new pair of access and refresh tokens.
	tokens, err := utils.GenerateNewTokens(foundedUser.ID.String(), foundedUser.UserRole)
	if err != nil {
		// Return status 500 and token generation error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}
	//Define user ID.
	userId := foundedUser.ID.String()

	// Create a new Redis connection
	connRedis, err := cache.RedisConnection()
	if err != nil {
		//fmt.Println("Redis Error", err)
		//Return status 500 and Redis connection error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	//Save refresh token to Redis.
	errSaveToRedis := connRedis.Set(context.Background(), userId, tokens.Refresh, 0).Err()
	fmt.Println(errSaveToRedis)
	if errSaveToRedis != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   errSaveToRedis.Error(),
		})
	}
	foundedUser.PasswordHash = ""
	// Return status 200 OK.

	cart, err := db.GetCartByUserID(foundedUser.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "login successful",
		"tokens": fiber.Map{
			"access":       tokens.Access,
			"refreshToken": tokens.Refresh,
			"user_details": foundedUser,
			"cart_id":      cart.ID.String(),
		},
	})
}
func RefreshToken(c *fiber.Ctx) error {

	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	// Get refresh token from the request body
	var data struct {
		RefreshToken string `json:"refreshToken"`
	}

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid request",
		})
	}

	// Decode the refresh token
	fmt.Println(data.RefreshToken)
	expiresRefreshToken, err := strconv.ParseInt(strings.Split(data.RefreshToken, ".")[1], 0, 64)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	//validity, err := utils.DecodeRefreshToken(data.RefreshToken)
	//if err != nil {
	//	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	//		"error": true,
	//		"msg":   "invalid refresh token 1",
	//	})
	//}
	//fmt.Println(validity)
	//if !validity {
	//	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "invalid refresh token 2 "})
	//}

	// Verify if the refresh token exists in Redis
	if time.Now().Unix() < expiresRefreshToken {
		connRedis, err := cache.RedisConnection()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": true,
				"msg":   "internal server error",
			})
		}
		userId := claims.UserID.String()
		userRole := claims.UserRole

		storedToken, err := connRedis.Get(context.Background(), userId).Result()
		if err != nil || storedToken != data.RefreshToken {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": true,
				"msg":   "invalid refresh token",
			})
		}

		// Generate new access token
		newTokens, err := utils.GenerateNewTokens(userId, userRole)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": true,
				"msg":   "could not generate new access token",
			})
		}

		// Update the refresh token in Redis (optional, based on your implementation)
		err = connRedis.Set(context.Background(), userId, newTokens.Refresh, time.Hour*24*7).Err() // Example: 7 days expiration
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": true,
				"msg":   "could not update refresh token",
			})
		}

		// Return the new tokens
		return c.JSON(fiber.Map{
			"error": false,
			"msg":   "new access token generated",
			"tokens": fiber.Map{
				"access":       newTokens.Access,
				"refreshToken": newTokens.Refresh,
			},
		})
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true,
			"msg": "unauthorized, your session was ended earlier"})
	}
}

func UserSignOut(c *fiber.Ctx) error {
	// Get claims from JWT.
	claims, err := utils.ExtractTokenMetadata(c)
	if err != nil {
		// Return status 500 and JWT parse error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Define user ID.
	userID := claims.UserId.String()

	// Create a new Redis connection.
	connRedis, err := cache.RedisConnection()
	if err != nil {
		// Return status 500 and Redis connection error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Delete refresh token from Redis.
	errDelFromRedis := connRedis.Del(context.Background(), userID).Err()
	if errDelFromRedis != nil {
		// Return status 500 and Redis deletion error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   errDelFromRedis.Error(),
		})
	}

	// Return status 204 no content.
	return c.SendStatus(fiber.StatusNoContent)
}

func ResetPassword(c *fiber.Ctx) error {

	// Extract token metadata to identify the user.
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "unauthorized",
		})
	}

	// Parse the request body to get the new password.
	type PasswordResetRequest struct {
		NewPassword string `json:"new_password" validate:"required,min=6"`
	}
	req := new(PasswordResetRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Create a database connection.
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Fetch the user using the ID from claims.
	userID := claims.UserID
	user, err := db.GetUserByID(userID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   "user not found",
		})
	}

	// Hash the new password.
	hashedPassword := utils.GeneratePassword(req.NewPassword)

	// Update the user's password in the database.
	if err := db.UpdateUserPassword(user.ID, hashedPassword); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "failed to update the password",
		})
	}

	// Return success response with updated timestamp.
	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "password reset successful",
	})
}

func DeleteAccount(c *fiber.Ctx) error {
	// Extract the user ID from the JWT claims.
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "unauthorized",
		})
	}

	// Parse the request body to get the provided password.
	type PasswordRequest struct {
		Password string `json:"password"`
	}
	var passwordReq PasswordRequest

	if err := c.BodyParser(&passwordReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid request body",
		})
	}

	// Create a database connection.
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Fetch the user's stored hashed password from the database.
	existingUser, err := db.GetUserByID(claims.UserID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "failed to fetch user details",
		})
	}

	// Compare the provided password with the stored hashed password.
	err = bcrypt.CompareHashAndPassword([]byte(existingUser.PasswordHash), []byte(passwordReq.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "password mismatch",
		})
	}

	// Delete the user from the database.
	if err := db.DeleteUserByID(claims.UserID); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "failed to delete the user",
		})
	}

	userId := claims.UserID.String()

	// Remove the user's session token from Redis (optional, if using session tokens).
	connRedis, err := cache.RedisConnection()
	if err == nil {
		_ = connRedis.Del(context.Background(), userId).Err()
	}

	// Return success response.
	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "account deleted successfully",
	})
}

// GoogleLogin handles the /auth/google/login endpoint
func GoogleLogin(c *fiber.Ctx) error {
	// Generate the OAuth2 URL for Google login

	url := utils.GoogleOauthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)

	// Redirect the user to Google's OAuth2 consent page
	return c.Redirect(url)
}

func GoogleCallback(c *fiber.Ctx) error {

	var cartId string
	code := c.Query("code")
	if code == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Code not found",
		})
	}

	token, err := utils.GoogleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to exchange token",
		})
	}

	// Fetch user information from Google
	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to get user info",
		})
	}
	defer resp.Body.Close()

	// Unmarshal the response
	var googleUser struct {
		Email          string `json:"email"`
		FirstName      string `json:"given_name"`
		LastName       string `json:"family_name"`
		GoogleID       string `json:"id"`
		ProfilePicture string `json:"picture"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&googleUser); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to parse user info",
		})
	}

	// Handle user registration/login
	db, _ := database.OpenDbConnection()
	foundedUser, err := db.GetUserByEmail(googleUser.Email)

	if err != nil && foundedUser.Email != googleUser.Email {
		// User does not exist, create a new one
		user := &models.User{
			ID:             uuid.New(),
			FirstName:      googleUser.FirstName,
			LastName:       googleUser.LastName,
			Email:          googleUser.Email,
			UserStatus:     1,
			UserRole:       "user",
			GoogleID:       &googleUser.GoogleID,
			ProfilePicture: &googleUser.ProfilePicture,
			CreatedAt:      time.Now(),
			UpdatedAt:      time.Now(),
		}
		err := db.CreateUser(user)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to create user",
			})
		}
		foundedUser = *user // Set foundedUser to the newly created user
		cart := &models.Cart{
			ID:                  uuid.New(),
			UserID:              foundedUser.ID,
			IsCouponCodeApplied: false,
			CouponCode:          "",
			CreatedAt:           time.Now(),
			UpdatedAt:           time.Now(),
		}

		if err := db.CreateCart(cart); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
		}

		cartId = cart.ID.String()
	} else {
		// Update the profile picture if it has changed
		if foundedUser.ProfilePicture == nil || *foundedUser.ProfilePicture != googleUser.ProfilePicture {
			foundedUser.ProfilePicture = &googleUser.ProfilePicture
			foundedUser.UpdatedAt = time.Now()
			err := db.UpdateUserProfilePicture(&foundedUser)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": "Failed to update profile picture",
				})
			}
		}

		cart, err := db.GetCartByUserID(foundedUser.ID)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
		}

		cartId = cart.ID.String()
	}

	// Generate JWT tokens
	tokens, err := utils.GenerateNewTokens(foundedUser.ID.String(), foundedUser.UserRole)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate tokens",
		})
	}

	// Store tokens and user information in session or in a secure place
	sessionID := uuid.New().String()
	sessionStore.Store(sessionID, fiber.Map{
		"user":          foundedUser,
		"cart_id":       cartId,
		"access_token":  tokens.Access,
		"refresh_token": tokens.Refresh,
	})

	// Set session ID as a cookie
	c.Cookie(&fiber.Cookie{
		Name:     "session_id",
		Value:    sessionID,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
		Secure:   os.Getenv("STAGE_STATUS") == "production",
		SameSite: "None",
	})

	redirectUrl := os.Getenv("FRONTEND_URL") + "/auth/callback"
	return c.Redirect(redirectUrl)
}

func GetTokens(c *fiber.Ctx) error {
	// Retrieve the session ID from the cookies
	sessionID := c.Cookies("session_id")
	if sessionID == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}

	// Retrieve the tokens and user information from the session store
	sessionData, ok := sessionStore.Load(sessionID)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Session not found",
		})
	}

	sessionMap := sessionData.(fiber.Map)

	// Send the tokens and user information to the frontend
	return c.JSON(fiber.Map{
		"access_token":  sessionMap["access_token"],
		"refresh_token": sessionMap["refresh_token"],
		"user_details":  sessionMap["user"],
		"cart_id":       sessionMap["cart_id"],
	})
}

func TokenDetails(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}
	return c.JSON(fiber.Map{"data": claims})

}
