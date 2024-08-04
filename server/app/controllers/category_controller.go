package controllers

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"time"
)

func CreateCategory(c *fiber.Ctx) error {
	now := time.Now().Unix()

	//Get claims from jwt
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": "token invalid",
		})
	}
	expires := claims.Expires

	//Checking if now time is greater then expiration from jwt
	if now > expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "token expired",
		})
	}
	category := models.ProductCategory{}
	if err := c.BodyParser(&category); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "invalid request body",
		})
	}
	//Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	category.ID = uuid.New()
	_, err := db.Exec(context.Background(),
		"INSERT INTO product_category (id, name, description) VALUES ($1, $2, $3)",
		category.ID, category.Name, category.Description,
	)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create category"})
	}
}
