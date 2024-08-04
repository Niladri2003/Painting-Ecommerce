package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"os"
)

// TokenMetadata struct to describe metadata in JWT.
type TokenMetadata struct {
	UserID   uuid.UUID
	UserRole string
	Expires  int64
}

// ExtractTokenMetadata func to extract metadata from JWT.
func ExtractTokenMetadata(c *fiber.Ctx) (*TokenMetadata, error) {
	token, err := verifyToken(c)
	if err != nil {
		return nil, err
	}

	// Setting and checking token and credentials.
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		// User ID.
		userID, err := uuid.Parse(claims["id"].(string))
		if err != nil {
			return nil, err
		}
		// User role.
		userRole, ok := claims["role"].(string)
		if !ok {
			return nil, fiber.NewError(fiber.StatusBadRequest, "invalid role type")
		}

		// Expires time.
		expires := int64(claims["expires"].(float64))

		//// User credentials.
		//credentials := map[string]bool{
		//	"book:create": claims["book:create"].(bool),
		//	"book:update": claims["book:update"].(bool),
		//	"book:delete": claims["book:delete"].(bool),
		//}

		return &TokenMetadata{
			UserID:   userID,
			UserRole: userRole,
			Expires:  expires,
		}, nil
	}

	return nil, err
}

func verifyToken(c *fiber.Ctx) (*jwt.Token, error) {
	tokenString := c.Get("Authorization")

	token, err := jwt.Parse(tokenString, jwtKeyFunc)
	if err != nil {
		return nil, err
	}

	return token, nil
}

func jwtKeyFunc(token *jwt.Token) (interface{}, error) {
	return []byte(os.Getenv("JWT_SECRET_KEY")), nil
}
