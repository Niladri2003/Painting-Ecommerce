package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"time"
)

// CreateCart handles creating a new cart for a specific user.
func CreateCart(c *fiber.Ctx) error {
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

	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	cart := &models.Cart{
		ID:        uuid.New(),
		UserID:    claims.UserID,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	if err := db.CreateCart(cart); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	return c.JSON(fiber.Map{"error": false, "msg": "Cart created successfully", "id": cart.ID.String()})
}

// AddItemToCart handles adding an item to a cart.
func AddItemToCart(c *fiber.Ctx) error {
	var item models.CartItem

	// Extract token metadata
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	// Parse request body
	if err := c.BodyParser(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "invalid request body"})
	}

	// Open database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	// Fetch product price from database
	product, err := db.GetProduct(item.ProductID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	// Calculate the total price
	item.TotalPrice = product.Price * float64(item.Quantity)
	item.ID = uuid.New()
	item.CreatedAt = time.Now()
	item.UpdatedAt = time.Now()

	// Add item to cart
	if err := db.AddItemToCart(&item); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	return c.JSON(fiber.Map{"error": false, "msg": "Item added to cart successfully"})
}

// UpdateCartItem updates an existing item in the cart.
func UpdateCartItem(c *fiber.Ctx) error {
	var item models.CartItem

	// Extract token metadata
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	// Parse request body
	if err := c.BodyParser(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "invalid request body"})
	}

	// Validate that the item belongs to the specified cart
	cartID, itemID := item.CartID, item.ID
	if cartID == uuid.Nil || itemID == uuid.Nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "cart ID and item ID are required"})
	}

	// Fetch product details to get the price
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	product, err := db.GetProduct(item.ProductID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	// Calculate the total price
	item.TotalPrice = product.Price * float64(item.Quantity)
	item.UpdatedAt = time.Now()

	// Update the cart item
	if err := db.UpdateCartItem(&item); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	return c.JSON(fiber.Map{"error": false, "msg": "Cart item updated successfully"})
}

// RemoveItemFromCart handles removing an item from a cart.
func RemoveItemFromCart(c *fiber.Ctx) error {
	itemID := c.Params("itemId")
	parsedItemID, err := uuid.Parse(itemID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "invalid item ID"})
	}

	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	if err := db.RemoveItemFromCart(parsedItemID); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	return c.JSON(fiber.Map{"error": false, "msg": "Item removed from cart successfully"})
}

// GetCartByUserID retrieves a cart for a specific user ID.
func GetCartByUserID(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	userID := claims.UserID

	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	cart, err := db.GetCartByUserID(userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	return c.JSON(fiber.Map{"error": false, "msg": "Cart retrieved successfully", "cart": cart})
}

// DeleteCart deletes a cart for a specific user ID.
func DeleteCart(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	userID := claims.UserID

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	if err := db.DeleteCart(userID); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	return c.JSON(fiber.Map{"error": false, "msg": "Cart deleted successfully"})
}
