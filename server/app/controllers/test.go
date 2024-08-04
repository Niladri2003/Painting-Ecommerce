package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
)

func Test(c *fiber.Ctx) error {
	userId, err := middleware.GetUserId(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}
	id, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"userId": userId,
		"id":     id,
	})
}
