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

}
