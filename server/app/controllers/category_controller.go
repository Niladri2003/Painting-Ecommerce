package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"time"
)

func CreateCategory(c *fiber.Ctx) error {
	type CategoryForm struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}
	var category CategoryForm
	now := time.Now().Unix()

	//Get claims from jwt
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": "token invalid",
			"status":  fiber.StatusInternalServerError,
		})
	}
	expires := claims.Expires

	//Checking if now time is greater than expiration from jwt
	if now > expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "token expired",
			"status":  fiber.StatusUnauthorized,
		})
	}
	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "Only admin can create category",
			"status":  fiber.StatusUnauthorized,
		})
	}

	if err := c.BodyParser(&category); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "invalid request body",
			"status":  fiber.StatusBadRequest,
		})
	}
	//Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":  true,
			"msg":    err.Error(),
			"status": fiber.StatusInternalServerError,
		})
	}
	//create a new product category models struct
	productCategory := &models.ProductCategory{}

	productCategory.ID = uuid.New()
	productCategory.Name = category.Name
	productCategory.Description = category.Description
	// Create a new Category .
	if err := db.CreateCategory(productCategory); err != nil {
		// Return status 500 and create category process error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":  true,
			"msg":    err.Error(),
			"status": fiber.StatusInternalServerError,
		})
	}
	return c.JSON(fiber.Map{
		"error":  false,
		"msg":    nil,
		"data":   productCategory,
		"status": fiber.StatusCreated,
	})
}
func GetAllCategory(c *fiber.Ctx) error {

	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":  true,
			"msg":    err.Error(),
			"status": fiber.StatusInternalServerError,
		})
	}
	// Retrieve all categories
	categories, err := db.GetAllCategories()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":  true,
			"msg":    err.Error(),
			"status": fiber.StatusInternalServerError,
		})
	}

	// Return the categories
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error":      false,
		"categories": categories,
		"status":     fiber.StatusOK,
	})

}
