package controllers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/app/uploader"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"net/http"
	"strconv"
	"time"
)

func CreateProduct(c *fiber.Ctx) error {

	now := time.Now().Unix()

	//Get claims from jwt
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "token invalid",
		})
	}
	expires := claims.Expires

	//Checking if now time is greater than expiration from jwt
	if now > expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "token expired",
		})
	}
	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "Only admin can create Product",
		})
	}
	// Parse product details
	title := c.FormValue("title")
	description := c.FormValue("description")
	price := c.FormValue("price")
	categoryID := c.FormValue("category_id")

	// Validate inputs
	if title == "" || description == "" || price == "" || categoryID == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Missing required fields"})
	}

	// Convert price to float
	priceValue, err := strconv.ParseFloat(price, 64)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid price format"})
	}

	// Convert categoryID to uuid.UUID
	categoryUUID, err := uuid.Parse(categoryID)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid category ID format"})
	}

	product := &models.Product{}

	// Generate UUID for the new product
	productId := uuid.New()

	product.ID = productId
	product.Title = title
	product.Description = description
	product.Price = priceValue
	product.CategoryID = categoryUUID
	product.CreatedAt = time.Now()
	product.UpdatedAt = time.Now()

	//Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}
	// Insert Product into database.
	if err := db.CreateProduct(product); err != nil {
		// Return status 500 and create category process error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	//Handle multipart files
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "Could not parse multipart form",
		})
	}

	files := form.File["images"]
	if files == nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "No images uploaded"})
	}

	for _, file := range files {
		filePath := fmt.Sprintf("/tmp/%s", file.Filename)
		if err := c.SaveFile(file, filePath); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not save file"})
		}

		imageURL, err := uploader.UploadImage(filePath)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not upload image"})
		}
		//Create a struct of product image model
		productImage := &models.ProductImage{}
		//Initialize product image details
		productImage.ID = uuid.New()
		productImage.ProductID = productId
		productImage.ImageURL = imageURL
		productImage.CreatedAt = time.Now()

		// Insert image URL into the database
		if err := db.CreateProductImage(productImage); err != nil {
			// Return status 500 and create category process error.
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": true,
				"msg":   "Could not save image",
			})
		}
	}

	return c.JSON(fiber.Map{
		"meg": "success",
	})
}

func DeleteProduct(c *fiber.Ctx) error {
	now := time.Now().Unix()

	//Get claims from jwt
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "token invalid",
		})
	}
	expires := claims.Expires

	//Checking if now time is greater than expiration from jwt
	if now > expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "token expired",
		})
	}
	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "Only admin can create Product",
		})
	}
	type ProductRequest struct {
		ID string `json:"id"`
	}
	var productRequest ProductRequest
	if err := c.BodyParser(&productRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	// Validate the ID
	productID := productRequest.ID
	fmt.Println("productID:", productID)
	productUUID, err := uuid.Parse(productID)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid product ID"})
	}

	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	// Delete product  images
	if err := db.DeleteProductImage(productUUID); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	// Delete product
	if err := db.DeleteProduct(productUUID); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Product and images deleted successfully"})
}

func GetProductDetails(c *fiber.Ctx) error {
	id := c.Params("id")

	// Validate the ID
	productUUID, err := uuid.Parse(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid product ID"})
	}
	fmt.Println(productUUID)
	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	productDetails, err := db.GetProduct(productUUID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	productImage, err := db.GetImagesByProduct(productUUID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"msg": "Product details retrieved successfully", "data": productDetails, "images": productImage})

}

func GetAllProducts(c *fiber.Ctx) error {
	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	allProducts, err := db.GetProducts()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"msg": "Product details retrieved successfully", "data": allProducts})

}
func GetProductsByCategoryID(c *fiber.Ctx) error {
	id := c.Params("id")

	// Parse the ID as uuid.UUID
	categoryId, err := uuid.Parse(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid contact ID",
		})
	}

	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	allProducts, err := db.GetProductsByCategory(categoryId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"msg": "Product details retrieved successfully", "data": allProducts})

}
