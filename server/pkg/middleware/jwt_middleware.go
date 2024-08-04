package middleware

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"os"
)

func Protected() fiber.Handler {
	return func(c *fiber.Ctx) error {
		jwtSecret := os.Getenv("JWT_SECRET_KEY")
		tokenString := c.Get("Authorization")
		if tokenString == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "unauthorized",
			})
		}
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fiber.NewError(fiber.StatusUnauthorized, "unexpected signing method")
			}
			return []byte(jwtSecret), nil

		})
		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "invalid token",
			})
		}

		id := c.Locals("id", token.Claims.(jwt.MapClaims))
		fmt.Println(id)
		return c.Next()

	}
}
func GetUserId(c *fiber.Ctx) (string, error) {
	//fmt.Println(c.Locals("user"))
	user := c.Locals("id")
	claims, ok := user.(jwt.MapClaims)
	if !ok {
		return "", fiber.NewError(fiber.StatusInternalServerError, "invalid token")
	}

	userId := claims["id"].(string)
	//fmt.Println("id=>", id)
	return userId, nil
}
