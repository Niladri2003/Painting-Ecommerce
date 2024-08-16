package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"strconv"
	"time"
)

func CreateProductSubcategory(c *fiber.Ctx) error {
	type input struct {
		Subcategory string `json:"subcategory"`
		Charge      string `json:"charge"`
	}
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create order"})
	}
	productIDParam := c.Params("productID")
	productID, err := uuid.Parse(productIDParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Invalid order ID"})
	}
	var request input
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}
	priceValue, err := strconv.ParseFloat(request.Charge, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid price"})
	}
	subcategory := models.ProductSubCategory{
		ID:          uuid.New(),
		ProductID:   productID,
		Subcategory: request.Subcategory,
		Charge:      priceValue,
	}

	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	if err := db.CreateSubcategory(subcategory); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "subcategory creation error"})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"error": false, "data": subcategory, "msg": "Subcategory created successfully"})
}

func DeleteProductSubcategory(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create order"})
	}
	subcategoryIDParam := c.Params("subcategoryID")
	subcategoryID, err := uuid.Parse(subcategoryIDParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Invalid subcategory ID"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	if err := db.DeleteSubcategoryById(subcategoryID); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "subcategory deletion error"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "data": "Subcategory deleted successfully"})

}
