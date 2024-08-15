package controllers

import (
	"context"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/pkg/utils"
	"github.com/niladri2003/PaintingEcommerce/platform/cache"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"golang.org/x/crypto/bcrypt"
)

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

	// Return status 200 OK.
	return c.JSON(fiber.Map{
		"error": false,
		"msg":   nil,
		"user":  user,
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
	fmt.Printf("Parsed sign-in data: %+v\n", signIn)
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
	fmt.Println(foundedUser)
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
		fmt.Println("Redis Error", err)
		//Return status 500 and Redis connection error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	//Save refresh token to Redis.
	errSaveToRedis := connRedis.Set(context.Background(), userId, tokens.Refresh, 0).Err()
	if errSaveToRedis != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   errSaveToRedis.Error(),
		})
	}
	foundedUser.PasswordHash = ""
	// Return status 200 OK.
	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "login successful",
		"tokens": fiber.Map{
			"access":       tokens.Access,
			"refreshToken": tokens.Refresh,
			"user_details": foundedUser,
		},
	})
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

	// Create a database connection.
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
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
