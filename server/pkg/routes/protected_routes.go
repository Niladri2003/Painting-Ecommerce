package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/niladri2003/PaintingEcommerce/app/controllers"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
)

func ProtectedRoutes(a *fiber.App) {
	route := a.Group("/api/v1")

	//Routes for user
	route.Post("/reset-password", middleware.Protected(), controllers.ResetPassword)
	route.Delete("/delete-account", middleware.Protected(), controllers.DeleteAccount)

	//Routes for POST method
	route.Post("/test", middleware.Protected(), controllers.Test)
	route.Post("/create-category", middleware.Protected(), controllers.CreateCategory)
	route.Post("/create-product", middleware.Protected(), controllers.CreateProduct)
	route.Delete("/delete-product/:productId", middleware.Protected(), controllers.DeleteProduct)
	route.Post("/change-product-status/:productId", middleware.Protected(), controllers.ChangeProductStatus)

	//Routes for address
	route.Post("/create-address", middleware.Protected(), controllers.CreateAddress)
	route.Put("/update-address/:addressId", middleware.Protected(), controllers.UpdateAddressByAddressId)
	route.Get("/get-addresses", middleware.Protected(), controllers.GetAddressByUserID)

	route.Get("/delete-address/:addressId", middleware.Protected(), controllers.DeleteAddressByAddressId)
	route.Get("/delete-all-addresses", middleware.Protected(), controllers.DeleteAddressByUserID)

	// Routes for cart
	route.Post("/create-cart", middleware.Protected(), controllers.CreateCart)
	route.Get("/get-cart", middleware.Protected(), controllers.GetCartByUserID)
	route.Post("/add-item", middleware.Protected(), controllers.AddItemToCart)
	route.Post("/update-item", middleware.Protected(), controllers.UpdateCartItem)
	route.Delete("/remove-item/:itemId", middleware.Protected(), controllers.RemoveItemFromCart)
	route.Delete("/delete-cart", middleware.Protected(), controllers.DeleteCart)
	route.Post("/apply-coupon", middleware.Protected(), controllers.CouponApply)

	// Orders Routes
	route.Post("/create-order", middleware.Protected(), controllers.CreateOrder)
	route.Post("/cancel-order/:orderID", middleware.Protected(), controllers.CancelOrder)
	route.Get("/get-all-orders", middleware.Protected(), controllers.GetAllOrdersByUserId)
	route.Get("/get-all-orders-admin", middleware.Protected(), controllers.GetAllOrders)
	route.Post("/status-shipped/:orderID", middleware.Protected(), controllers.UploadOrderStatusToShipped)
	route.Post("/status-delivered/:orderID", middleware.Protected(), controllers.UploadOrderStatusToDelivered)
	route.Post("/status-payment-failed/:orderID", middleware.Protected(), controllers.UploadOrderStatusToPaymentFailed)

	// Coupon Routes
	route.Post("/create-coupon", middleware.Protected(), controllers.CreateCoupon)
	route.Get("/get-all-coupons", middleware.Protected(), controllers.GetAllCoupon)
	route.Post("/change-coupon-status/:couponID", middleware.Protected(), controllers.ChangeCouponStatus)
	route.Delete("delete-coupon/:couponID", middleware.Protected(), controllers.DeleteCoupon)
	route.Post("/remove-coupon", middleware.Protected(), controllers.RemoveCoupon)

	//Product Size Routes
	route.Post("/create-product-size/:productID", middleware.Protected(), controllers.CreateProductSize)
	route.Delete("/delete-product-size/:sizeID", middleware.Protected(), controllers.DeleteProductSize)

	// Product Subcategory
	route.Post("/create-product-subcategory/:productId", middleware.Protected(), controllers.CreateProductSubcategory)
	route.Delete("/delete-product-subcategory/:subcategoryID", middleware.Protected(), controllers.DeleteProductSubcategory)
}
