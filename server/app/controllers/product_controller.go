package controllers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"net/http"
	"strconv"
	"time"
)

func CreateProduct(c *fiber.Ctx) error {

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
	// Parse product details
	title := c.FormValue("title")
	description := c.FormValue("description")
	price := c.FormValue("price")
	categoryID := c.FormValue("category_id")

	// Validate inputs
	if title == "" || description == "" || price == "" || categoryID == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Missing required fields"})
	}

	// Convert price to float
	priceValue, err := strconv.ParseFloat(price, 64)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid price format"})
	}

	// Generate UUID for the new product

	product := &models.Product{}

	product.ID = uuid.New()
	product.Title = title
	product.Description = description
	product.Price = priceValue
	product.CreatedAt = time.Now()
	product.UpdatedAt = time.Now()

	fmt.Println(now)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}
