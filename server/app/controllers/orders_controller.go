package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"time"
)

func CreateOrder(c *fiber.Ctx) error {
	type CartId struct {
		Id string `json:"id"`
	}
	var cartId CartId
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "user" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create carts"})
	}

	if err := c.BodyParser(&cartId); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "invalid cart id"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "database connection error"})
	}
	//Fetch All Cart Items using CartId
	cart, err := db.GetCartByUserID(claims.UserID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to get Cart Items"})
	}
	//Get Default Address
	defaultAddress, err := db.GetDefaultAddressByID(claims.UserID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to get default address"})
	}

	orderId := uuid.New()
	order := models.Order{
		ID:         orderId,
		UserID:     claims.UserID,
		Total:      calculateTotal(cart.Items),
		Status:     "pending",
		AddressID:  defaultAddress.ID,
		InvoiceUrl: "",
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}
	if err := db.CreateOrder(&order); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to create order"})
	}
	//Create Order Items
	for _, item := range cart.Items {
		orderItem := models.OrderItem{
			ID:        uuid.New(), // Generate a new UUID for the order item
			OrderID:   orderId,
			ProductID: item.ProductID,
			Quantity:  item.Quantity,
			Price:     item.TotalPrice,
			Status:    "approved", // or any other default status
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		if err := db.CreateOrderItem(&orderItem); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to create order item"})
		}
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"data": order})
}

// Helper function to calculate the total price from cart items
func calculateTotal(items []models.CartItem) float64 {
	total := 0.0
	for _, item := range items {
		total += float64(item.TotalPrice)
	}
	return total
}
