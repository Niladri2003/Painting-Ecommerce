package controllers

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/pkg/utils"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"github.com/valyala/fasthttp"
)

//All Handler
// 1->CreateOrder
// 2->CancelOrder
// 3->UploadOrderStatusToShipped
// 4->UploadOrderStatusToDelivered
// 5->UploadOrderStatus to Payment Failed (If approved Then Payment Verified)
// 5->GetAllOrdersByUserId

func CreateOrder(c *fiber.Ctx) error {
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

	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "database connection error"})
	}
	//Fetch All Cart Items using CartId
	cart, err := db.GetCartByUserID(claims.UserID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to get Cart Items"})
	}

	cartItemLen := len(cart.Items)
	if cartItemLen == 0 {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Cart Items is empty"})
	}
	//Get Default Address
	defaultAddress, err := db.GetDefaultAddressByID(claims.UserID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to get default address"})
	}
	if defaultAddress == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Default address is nil"})
	}
	// Get User Details
	applied := cart.IsCouponCodeApplied
	if applied {
		orderId := uuid.New()
		order := models.Order{
			ID:         orderId,
			UserID:     claims.UserID,
			CouponCode: cart.CouponCode,
			Total:      calculateTotalWithDiscount(cart.Items, cart.Discountpercentage),
			Status:     "pending",
			AddressID:  defaultAddress.ID,
			InvoiceUrl: "",
			CreatedAt:  time.Now(),
			UpdatedAt:  time.Now(),
		}
		if err := db.CreateOrder(&order); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to create order"})
		}

	}
	orderId := uuid.New()
	order := models.Order{
		ID:         orderId,
		UserID:     claims.UserID,
		CouponCode: "",
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
		fmt.Println(item.ProductName)
		orderItem := models.OrderItem{
			ID:            uuid.New(), // Generate a new UUID for the order item
			OrderID:       orderId,
			ProductID:     item.ProductID,
			ProductName:   item.ProductName,
			Size:          item.Size,
			Subcategory:   item.Subcategory,
			Quantity:      item.Quantity,
			QuantityPrice: item.QuantityPrice,
			Price:         item.TotalPrice,
			Status:        "pending", // or any other default status
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
		}

		if err := db.CreateOrderItem(&orderItem); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to create order item"})
		}
	}
	// Generate Invoice
	//invoiceDoc, _ := generator.New(generator.Invoice, &generator.Options{
	//	TextTypeInvoice: "INVOICE",
	//	AutoPrint:       false,
	//})
	//invoiceDoc.SetHeader(&generator.HeaderFooter{
	//	Text:       "<center>Trivart</center>",
	//	Pagination: true,
	//})
	//invoiceDoc.SetFooter(&generator.HeaderFooter{
	//	Text:       "<center>Thank you for your business!</center>",
	//	Pagination: true,
	//})
	//invoiceDoc.SetRef("INV-" + orderId.String()[:8])
	//invoiceDoc.SetDate(time.Now().Format("02/01/2006"))
	//
	//// Set company and customer details
	//invoiceDoc.SetCompany(&generator.Contact{
	//	Name: "Trivart",
	//	Address: &generator.Address{
	//		Address:    "123 Business Rd",
	//		City:       "Business City",
	//		Country:    "Country",
	//		PostalCode: "123456",
	//	},
	//})
	//// Set Customer Details
	//invoiceDoc.SetCustomer(&generator.Contact{
	//	Name: defaultAddress.FirstName + " " + defaultAddress.LastName,
	//	Address: &generator.Address{
	//		Address:    defaultAddress.StreetAddress,
	//		City:       defaultAddress.TownCity,
	//		Country:    defaultAddress.Country,
	//		PostalCode: defaultAddress.PinCode,
	//	},
	//})
	//// Add each cart item to the invoice
	//for _, item := range cart.Items {
	//	invoiceDoc.AppendItem(&generator.Item{
	//		Name:     item.ProductName,
	//		UnitCost: fmt.Sprintf("%.2f", item.QuantityPrice),
	//		Quantity: fmt.Sprintf("%d", item.Quantity),
	//	})
	//}
	//// Generate the PDF
	//pdf, err := invoiceDoc.Build()
	//if err != nil {
	//	fmt.Println("PDF error", err)
	//	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to generate invoice"})
	//}
	//invoiceDir := "invoices"
	//if _, err := os.Stat(invoiceDir); os.IsNotExist(err) {
	//	os.Mkdir(invoiceDir, os.ModePerm)
	//}
	//invoicePath := fmt.Sprintf("invoices/%s.pdf", orderId.String())
	//err = pdf.OutputFileAndClose(invoicePath)
	//if err != nil {
	//	fmt.Println("save error", err)
	//	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to save invoice"})
	//}

	err = db.DeleteCart(claims.UserID)
	if err != nil {
		c.Status(500).JSON(fiber.Map{"error": true, "msg": "Failed to Clear cart"})
	}


		// Get User Details by Order ID
	user, err := db.GetUserByID(claims.UserID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to get user details"})
	}

	// Email details
	recipientName := user.FirstName + " " + user.LastName
	recipientEmail := user.Email
	subject := "Your Order Has Been Placed!"
	mailTemplatePath := "templates/order_confirmation.html"
	emailData := struct {
		Name        string
		OrderId     string
		OrderDate   string
		TotalAmount string
	}{
		Name:        recipientName,
		OrderId:     orderId.String(),
		OrderDate:   time.Now().Format("02 Jan 2006 15:04 MST"),
		TotalAmount: fmt.Sprintf("%.2f", order.Total), // Assuming order.Total is of type float64
	}

	// Send confirmation email asynchronously
	go func() {
		err := utils.SendConfirmationEmail(recipientEmail, subject, mailTemplatePath, emailData)
		if err != nil {
			fmt.Printf("Failed to send confirmation email: %v \n", err)
		} else {
			fmt.Println("Confirmation email sent successfully!")
		}
	}()

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


	user, err := db.GetUserByOrderId(orderID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to get user details in order shipped controller"})
	}

    // Send a confirmation email to the contact
	recipientName :=  user.FirstName + " " + user.LastName
	recipientEmail := user.Email
	subject := "Your Order Has Shipped!"
	mailTemplatePath := "templates/order_shipped.html"
	emailData := struct {
		Name           string
		OrderId        string
	}{
		Name:           recipientName,
		OrderId:        orderID.String(),

	}
	

	// Launch a goroutine to send the email asynchronously
	go func() {
		err := utils.SendConfirmationEmail(recipientEmail,subject, mailTemplatePath,emailData)
		if err != nil {
			fmt.Printf("Failed to send confirmation email: %v \n", err)
		} else {
			fmt.Println("Confirmation email sent successfully!")
		}
	}()

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


	user, err := db.GetUserByOrderId(orderID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to get user details in order Delivered controller"})
	}

    // Send a confirmation email to the contact
	recipientName :=  user.FirstName + " " + user.LastName
	recipientEmail := user.Email
	subject := "Your Order Has Been Delivered!"
	mailTemplatePath := "templates/order_delivered.html"
	emailData := struct {
		Name           string
		OrderId        string
	}{
		Name:           recipientName,
		OrderId:        orderID.String(),

	}

	// Launch a goroutine to send the email asynchronously
	go func() {
		err := utils.SendConfirmationEmail(recipientEmail,subject, mailTemplatePath,emailData)
		if err != nil {
			fmt.Printf("Failed to send confirmation email: %v \n", err)
		} else {
			fmt.Println("Confirmation email sent successfully!")
		}
	}()


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
	orders, err := db.GetOrdersByUserID(claims.UserID)
	if err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to get all orders"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "data": orders, "msg": "All orders Fetched succesfully"})
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
	orders, err := db.GetAllOrders()
	if err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "Failed to retrieve orders"})
	}

	// Return the orders in the response
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "orders": orders})
}

// Helper function to calculate the total price from cart items
func calculateTotal(items []models.CartItem) float64 {
	total := 0.0
	for _, item := range items {
		total += float64(item.AfterDiscountTotalPrice)
	}
	return total
}
func calculateTotalWithDiscount(items []models.CartItem, discount float64) float64 {
	total := 0.0
	for _, item := range items {
		total += item.AfterDiscountTotalPrice
	}
	discountAmount := total * (discount / 100)
	finalTotal := total - discountAmount
	return finalTotal
}
