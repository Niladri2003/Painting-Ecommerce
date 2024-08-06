package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/niladri2003/PaintingEcommerce/app/controllers"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
)

func ProtectedRoutes(a *fiber.App) {
	route := a.Group("/api/v1")

	//Routes for POST method
	route.Post("/test", middleware.Protected(), controllers.Test)
	route.Post("/create-category", middleware.Protected(), controllers.CreateCategory)
	route.Post("/create-product", middleware.Protected(), controllers.CreateProduct)
	route.Delete("/delete-product", middleware.Protected(), controllers.DeleteProduct)


	//Routes for address
	route.Post("/create-address", middleware.Protected(), controllers.CreateAddress)
	route.Put("/update-address", middleware.Protected(), controllers.UpdateAddressByUserID)
	route.Get("/get-addresses", middleware.Protected(), controllers.GetAddressByUserID)
	

	route.Get("/delete-address/:addressId", middleware.Protected(), controllers.DeleteAddressByAddressId)
	route.Get("/delete-all-addresses", middleware.Protected(), controllers.DeleteAddressByUserID)
	
}
