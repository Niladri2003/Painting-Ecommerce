package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func FiberMiddleware(a *fiber.App) {
	a.Use(
		//add CORS to each route
		cors.New(cors.Config{
			AllowOrigins:     "http://localhost:5173, http://localhost:3000",
			AllowHeaders:     "Origin, Content-Type, Accept,Authorization",
			AllowCredentials: true,
		}),
		logger.New(),
	)
}
