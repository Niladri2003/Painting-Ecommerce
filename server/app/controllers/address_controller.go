package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"time"
)

// CreateAddress handles creating a new address for a specific user.
func CreateAddress(c *fiber.Ctx) error {

	var address models.AddressForm

	now := time.Now().Unix()

	// Get claims from JWT
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": "token invalid",
		})
	}
	expires := claims.Expires

	// Check if token is expired
	if now > expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "token expired",
		})
	}
	if claims.UserRole != "user" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "Only user can create address",
		})
	}

	// Parse request body
	if err := c.BodyParser(&address); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "invalid request body",
		})
	}

	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	// Create a new address model
	addressModel := &models.Address{
		ID:            uuid.New(),
		UserID:        claims.UserID,
		FirstName:     address.FirstName,
		LastName:      address.LastName,
		Country:       address.Country,
		StreetAddress: address.StreetAddress,
		TownCity:      address.TownCity,
		State:         address.State,
		PinCode:       address.PinCode,
		MobileNumber:  address.MobileNumber,
		Email:         address.Email,
		OrderNotes:    address.OrderNotes, // Handle as optional
		CreatedAt:     time.Now().Format(time.RFC3339),
		UpdatedAt:     time.Now().Format(time.RFC3339),
	}

	// Create a new address in the database
	id, err := db.CreateAddress(addressModel)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"error":   false,
		"message": "Address created successfully",
		"id":      id.String(),
	})
}

// UpdateAddressByUserID handles updating an address for a specific user.
func UpdateAddressByUserID(c *fiber.Ctx) error {
	// Get user ID from JWT claims
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	userId := claims.UserID

	// Check if token is expired
	now := time.Now().Unix()
	if now > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "Token expired",
		})
	}
	if claims.UserRole != "user" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "Only users can update addresses",
		})
	}

	// Parse the request body
	var addressForm models.AddressForm
	if err := c.BodyParser(&addressForm); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid request body",
		})
	}

	// Ensure user ID from JWT matches the user ID in the request body
	if addressForm.UserID != userId {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error":   true,
			"message": "User ID mismatch",
		})
	}

	// Convert AddressForm to Address
	address := models.Address{
		UserID:        addressForm.UserID,
		FirstName:     addressForm.FirstName,
		LastName:      addressForm.LastName,
		Country:       addressForm.Country,
		StreetAddress: addressForm.StreetAddress,
		TownCity:      addressForm.TownCity,
		State:         addressForm.State,
		PinCode:       addressForm.PinCode,
		MobileNumber:  addressForm.MobileNumber,
		Email:         addressForm.Email,
		OrderNotes:    addressForm.OrderNotes,
		UpdatedAt:     time.Now().Format(time.RFC3339),
	}

	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Update the address by userID
	if err := db.UpdateAddressByUserID(userId, &address); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Fetch the updated address
	updatedAddress, err := db.GetAddressesByUserID(userId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"error":   false,
		"message": "Address updated successfully",
		"address": updatedAddress,
	})
}

func GetAddressByUserID(c *fiber.Ctx) error {
	// Get user ID from JWT claims
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	userId := claims.UserID

	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	// Get address by user ID
	address, err := db.GetAddressesByUserID(userId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"error":   false,
		"message": "Address retrieved successfully",
		"address": address,
	})
}

// GetAllAddresses retrieves all addresses from the database
func GetAllAddresses(c *fiber.Ctx) error {
	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	// Get all addresses from the database
	addresses, err := db.GetAddresses()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"error":   false,
		"message": "Addresses retrieved successfully",
		"addresses": addresses,
	})
}

// DeleteAddressByUserID deletes an address for a specific user by address ID.
func DeleteAddressByUserID(c *fiber.Ctx) error {
	// Get user ID from JWT claims
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": "token invalid",
		})
	}

	userID := claims.UserID

	// Check if token is expired
	now := time.Now().Unix()
	if now > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "Token expired",
		})
	}
	if claims.UserRole != "user" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "Only users can delete addresses",
		})
	}


	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	// Delete the address by userID
	err = db.DeleteAddressByUserID(userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"error":   false,
		"message": "Address deleted successfully",
	})
}

// DeleteAddress deletes an address by address ID.
func DeleteAddressByAddressId(c *fiber.Ctx) error {
	
	addressId := c.Params("addressId")
	parsedAddressId, err := uuid.Parse(addressId)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid address ID",
		})
	}


	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": "Internal server error",
		})
	}

	// Check if token is expired
	now := time.Now().Unix()
	if now > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "Token expired",
		})
	}
	


	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	// Delete the address by address ID
	err = db.DeleteAddress(parsedAddressId)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"error":   false,
		"message": "Address deleted successfully",
	})
}
