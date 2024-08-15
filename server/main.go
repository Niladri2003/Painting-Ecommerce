package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/niladri2003/PaintingEcommerce/pkg/configs"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/pkg/routes"
	"github.com/niladri2003/PaintingEcommerce/pkg/utils"
	"github.com/niladri2003/PaintingEcommerce/platform/migration"
	"log"
	"os"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	config := configs.FiberConfig()
	//migration
	migration.RunMigration()

	//Define a new fiber app with config.
	app := fiber.New(config)

	//Middlewares
	middleware.FiberMiddleware(app)

	utils.GoogleOauthInit()

	//Routes
	routes.PublicRoutes(app)
	routes.ProtectedRoutes(app)
	// Start server (with or without graceful shutdown)
	if os.Getenv("STAGE_STATUS") == "dev" {
		fmt.Println("Running in development mode")
		fmt.Println(os.Getenv("STAGE_STATUS"))
		utils.StartServer(app)
	} else {
		fmt.Println("Running in production mode")
		//utils.StartServerWithGracefulShudown(app)
		utils.StartServer(app)
	}
}
