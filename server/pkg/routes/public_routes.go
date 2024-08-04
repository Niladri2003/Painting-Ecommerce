package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/niladri2003/PaintingEcommerce/app/controllers"
)

func PublicRoutes(a *fiber.App) {
	route := a.Group("/api/v1")

	//Routes for POST method
	route.Post("/user/register", controllers.UserSignUp)
	route.Post("/user/sign-in", controllers.UserSignIn)
	route.Get("/get-all-category", controllers.GetAllCategory)
	route.Get("/get-product-details", controllers.GetProductDetails)
}
