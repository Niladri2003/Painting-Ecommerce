package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"github.com/valyala/fasthttp"
	"time"
)

//All Handler
// 1->CreateOrder
// 2->CancelOrder
// 3->UploadOrderStatusToShipped
// 4->UploadOrderStatusToDelivered
// 5->UploadOrderStatus to Payment Failed (If approved Then Payment Verified)
// 5->GetAllOrdersByUserId

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
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create order"})
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

// Cancel Order For(User & Admin)
func CancelOrder(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "user" || claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users and admin can cancel order"})
	}
	// Get the order ID from the URL parameters
	orderIDParam := c.Params("orderID")
	orderID, err := uuid.Parse(orderIDParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Invalid order ID"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fasthttp.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "database connection error"})
	}

	err = db.CancelOrder(orderID)
	if err != nil {
		return c.Status(fasthttp.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Failed to cancel order"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "data": orderID, "msg": "Successfully cancelled order"})
}

// Status to Shipped For (Admin Only)
func UploadOrderStatusToShipped(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users and admin can cancel order"})
	}
	// Get the order ID from the URL parameters
	orderIDParam := c.Params("orderID")
	orderID, err := uuid.Parse(orderIDParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Invalid order ID"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fasthttp.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "database connection error"})
	}

	err = db.ShippedOrder(orderID)
	if err != nil {
		return c.Status(fasthttp.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Failed to set status to shipped for  order"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "data": orderID, "msg": "Successfully shipped order"})

}

// Status to Delivered For (Admin Only)
func UploadOrderStatusToDelivered(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only  admin can set delivered order"})
	}
	// Get the order ID from the URL parameters
	orderIDParam := c.Params("orderID")
	orderID, err := uuid.Parse(orderIDParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Invalid order ID"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fasthttp.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "database connection error"})
	}

	err = db.DeliveredOrder(orderID)
	if err != nil {
		return c.Status(fasthttp.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Failed to set status to delivered for  order"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "data": orderID, "msg": "Successfully delivered order"})

}

// Status to Delivered For (Admin Only)
func UploadOrderStatusToPaymentFailed(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "user" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only  user can set paymentFailed order"})
	}
	// Get the order ID from the URL parameters
	orderIDParam := c.Params("orderID")
	orderID, err := uuid.Parse(orderIDParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Invalid order ID"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fasthttp.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "database connection error"})
	}

	err = db.PaymentFailedOrder(orderID)
	if err != nil {
		return c.Status(fasthttp.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Failed to set status to payment Failed for  order"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "data": orderID, "msg": "Successfully payment Failed order"})

}

// Get All Orders For (User only)
func GetAllOrdersByUserId(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "user" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "Invalid Request Check user Role"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "database connection error"})
	}
	orders, err := db.GetAddressesByUserID(claims.UserID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to get all orders"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": orders})
}

// Handler for get all orders (Admin)
func GetAllOrders(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "Only Admin can get all orders"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "database connection error"})
	}

	// Get all orders using the GetOrders query
	orders, err := db.GetOrders()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to retrieve orders"})
	}

	// Return the orders in the response
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "orders": orders})

}

// Helper function to calculate the total price from cart items
func calculateTotal(items []models.CartItem) float64 {
	total := 0.0
	for _, item := range items {
		total += float64(item.TotalPrice)
	}
	return total
}
