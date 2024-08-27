package controllers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"time"
)

// CreateCart handles creating a new cart for a specific user.
//func CreateCart(c *fiber.Ctx) error {
//	claims, err := middleware.ExtractTokenMetadata(c)
//	if err != nil {
//		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
//	}
//
//	if time.Now().Unix() > claims.Expires {
//		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
//	}
//
//	if claims.UserRole != "user" {
//		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create carts"})
//	}
//
//	db, err := database.OpenDbConnection()
//	if err != nil {
//		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
//	}
//
//	cart := &models.Cart{
//		ID:                  uuid.New(),
//		UserID:              claims.UserID,
//		IsCouponCodeApplied: false,
//		CouponCode:          "",
//		Discountpercentage:  0.0,
//		CreatedAt:           time.Now(),
//		UpdatedAt:           time.Now(),
//	}
//
//	if err := db.CreateCart(cart); err != nil {
//		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
//	}
//
//	return c.JSON(fiber.Map{"error": false, "msg": "Cart created successfully", "id": cart.ID.String()})
//}

// AddItemToCart handles adding an item to a cart.
func AddItemToCart(c *fiber.Ctx) error {

	//	data requirement for this api
	// CartId, ProductId,Quantity,SizeId,SubcategoryID

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
	subcategory, err := db.GetSubcategoryById(item.ProductSubCategoryId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to load subcategory info"})
	}
	//Fetch size details
	sizeInfo, err := db.GetProductSizeId(item.ProductSizeId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to load size info"})
	}
	// Fetch product price from database
	product, err := db.GetProduct(item.ProductID)
	if err != nil {
		fmt.Println("Error while finding product", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	//Fetch most first uploaded image of a product
	productImage, err := db.GetProductImageForCart(item.ProductID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "unable to find product image"})
	}
	// Check if an item with the same ProductID, ProductSubCategoryId, and ProductSizeId already exists in the cart
	existingItem, err := db.GetCartItemByDetails(item.CartID, item.ProductID, item.ProductSubCategoryId, item.ProductSizeId)
	if err == nil && existingItem != nil {
		// If the item exists, update the quantity and total prices
		existingItem.Quantity += item.Quantity
		existingItem.TotalPrice = float64(existingItem.Quantity)*existingItem.QuantityPrice + (float64(existingItem.Quantity) * (sizeInfo.Charge + subcategory.Charge))
		existingItem.AfterDiscountTotalPrice = float64(existingItem.Quantity)*product.DiscountedPrice + (float64(existingItem.Quantity) * (sizeInfo.Charge + subcategory.Charge))
		existingItem.UpdatedAt = time.Now()

		// Update the existing item in the cart
		if err := db.UpdateCartItem(existingItem); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
		}

		return c.JSON(fiber.Map{"error": false, "msg": "Cart item updated successfully"})
	}

	//Fetch Product subcategory details
	fmt.Println("subID", item.ProductSubCategoryId)

	// Calculate the total price
	//cart id, quantity, productid will be coming from frontend

	item.ID = uuid.New()
	item.ProductName = product.Title
	item.ProductImage = productImage.ImageURL
	item.QuantityPrice = product.OriginalPrice
	item.TotalPrice = float64(item.Quantity)*product.OriginalPrice + (sizeInfo.Charge + subcategory.Charge)
	item.AfterDiscountTotalPrice = float64(item.Quantity)*product.DiscountedPrice + (sizeInfo.Charge + subcategory.Charge)
	item.Size = sizeInfo.Size
	item.Subcategory = subcategory.Subcategory
	item.ProductSubCategoryId = subcategory.ID
	item.ProductSizeId = sizeInfo.ID
	item.CreatedAt = time.Now()
	item.UpdatedAt = time.Now()

	// Add item to cart
	if err := db.AddItemToCart(&item); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "msg": "Item added to cart successfully"})
}

// UpdateCartItem updates an existing item in the cart.
func UpdateCartItem(c *fiber.Ctx) error {

	//TODO - Check the given cartItemId belongs to the user cart
	type request struct {
		CartItemId string `json:"cart_item_id"`
		Quantity   int    `json:"quantity"`
	}
	var input request
	// Extract token metadata
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	// Parse request body
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "invalid request body"})
	}
	CartITemID, err := uuid.Parse(input.CartItemId)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Failed to parse cart item id"})
	}
	// Fetch product details to get the price
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	cartItem, err := db.GetCartItemByID(CartITemID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	product, err := db.GetProduct(cartItem.ProductID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	//Fetch Product subcategory details
	subcategory, err := db.GetSubcategoryById(cartItem.ProductSubCategoryId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to load subcategory info"})
	}
	//Fetch size details
	sizeInfo, err := db.GetProductSizeId(cartItem.ProductSizeId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to load size info"})
	}
	// Update the quantity and recalculate prices
	sizeandsubcategorycharges := (sizeInfo.Charge + subcategory.Charge) * float64(input.Quantity)
	cartItem.Quantity = input.Quantity
	cartItem.TotalPrice = float64(cartItem.Quantity)*product.OriginalPrice + (sizeandsubcategorycharges)
	cartItem.AfterDiscountTotalPrice = float64(cartItem.Quantity)*product.DiscountedPrice + (sizeandsubcategorycharges)
	cartItem.UpdatedAt = time.Now()

	// Update the cart item
	if err := db.UpdateCartItem(cartItem); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "msg": "Cart item updated successfully"})
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

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "msg": "Item removed from cart successfully"})
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

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "msg": "Cart retrieved successfully", "cart": cart})
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

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "msg": "Cart deleted successfully"})
}
