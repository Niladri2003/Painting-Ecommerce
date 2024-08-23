package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/niladri2003/PaintingEcommerce/app/controllers"
)

func PublicRoutes(a *fiber.App) {
	route := a.Group("/api/v1")

	//Routes for Authentication method
	route.Post("/user/register", controllers.UserSignUp)
	route.Post("/user/sign-in", controllers.UserSignIn)
	route.Get("/user/google/login", controllers.GoogleLogin)
	route.Get("/user/google/callback", controllers.GoogleCallback)
	route.Get("/user/get-tokens", controllers.GetTokens)
	route.Post("/renew-access-token", controllers.RefreshToken)

	route.Get("/get-all-category", controllers.GetAllCategory)
	route.Get("/get-top-home", controllers.GetTop6Products)
	route.Get("/get-product-details/:id", controllers.GetProductDetails)
	route.Get("/get-all-product", controllers.GetAllProducts)
	route.Get("/get-product-categorise", controllers.GetTop5ProductsCategoryWise)
	route.Get("/get-products-by-category-id/:id", controllers.GetProductsByCategoryID)

	//Routes for contact us
	route.Post("/contact-us", controllers.CreateContactUs)                      //Create a new contact message
	route.Get("/get-all-contact", controllers.GetAllContacts)                   //Get all contact messages
	route.Get("/get-contact-by-id/:id", controllers.GetContactByID)             //Get a contact message by its ID
	route.Put("/update-reply-status/:id", controllers.UpdateContactReplyStatus) //Update the replied status
	route.Delete("/delete-contact/:id", controllers.DeleteContact)              //Delete a contact message by its ID

	//Routes for address
	route.Get("/get-all-addresses", controllers.GetAllAddresses)
}
