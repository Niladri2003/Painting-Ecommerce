package controllers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/utils"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
)

// CreateContactUs handles the creation of a new contact message.
func CreateContactUs(c *fiber.Ctx) error {
	// Create a new contact message struct
	contact := &models.NewContact{}

	// Parse the incoming JSON body
	if err := c.BodyParser(contact); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	if contact.FirstName == "" || contact.LastName == "" || contact.Email == "" || contact.Message == "" || contact.Phone == "" || contact.Subject == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "All fields are required",
		})
	}

	// Validate contact fields
	validate := utils.NewValidator()
	if err := validate.Struct(contact); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   utils.ValidatorErrors(err),
		})
	}

	// Print parsed contact data for debugging
	// fmt.Printf("Parsed contact data: %+v\n", contact)

	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Create a new contact message in the database

	id, err := db.CreateContact(contact) // Handle both return values
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Print the created contact ID for debugging
	// fmt.Printf("Created contact ID: %s\n", id.String())

	// err := utils.SendEmail(
	// 	"John Doe",
	// 	"johndoe@example.com",
	// 	"Thank You for Contacting Us!",
	// 	"templates/contact_us.html",
	// 	struct{ Name string }{Name: "John Doe"},
	// )

	// Send a confirmation email to the contact
	recipientName := contact.FirstName + " " + contact.LastName
	recipientEmail := contact.Email
	subject := "Thank You for Contacting Us!"
	mailTemplatePath := "templates/email_confirmation.html"
	emailData := struct{ Name string }{Name: recipientName}

	// Launch a goroutine to send the email asynchronously
	go func() {
		err := utils.SendEmailUsingMailgun(recipientEmail, subject, mailTemplatePath, emailData)
		if err != nil {
			fmt.Printf("Failed to send confirmation email: %v \n", err)
		} else {
			fmt.Println("Confirmation email sent successfully!")
		}
	}()

	// Continue with other tasks
	fmt.Println("Email is being sent asynchronously...")

	// Return success response with the ID of the created contact
	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "Message sent successfully",
		"id":    id.String(),
	})
}

// GetAllContacts handles retrieving all contact messages.
func GetAllContacts(c *fiber.Ctx) error {
	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Retrieve all contact messages
	contacts, err := db.GetAllContacts()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Return the list of contact messages
	return c.JSON(fiber.Map{
		"error":    false,
		"contacts": contacts,
	})
}

// GetContactByID handles retrieving a contact message by its ID.
func GetContactByID(c *fiber.Ctx) error {
	id := c.Params("id")

	// Parse the ID as uuid.UUID
	contactID, err := uuid.Parse(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid contact ID",
		})
	}

	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Retrieve the contact message by ID
	contact, err := db.GetContactByID(contactID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   "Contact message not found",
		})
	}

	// Return the contact message
	return c.JSON(fiber.Map{
		"error":   false,
		"contact": contact,
	})
}

// UpdateContactReplyStatus handles updating the replied status of a contact message.
func UpdateContactReplyStatus(c *fiber.Ctx) error {
	// Extract and validate contact ID from URL params
	id := c.Params("id")
	contactID, err := uuid.Parse(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid contact ID",
		})
	}

	// Open database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		fmt.Printf("Database connection error: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "Internal server error",
		})
	}

	// defer db.Close()

	// Update the contact status to true in the database
	if err := db.UpdateContact(contactID, true); err != nil {
		fmt.Printf("Error updating contact status: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "Failed to update contact status",
		})
	}

	// Return success response
	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "Replied status updated successfully",
	})
}

// DeleteContact handles the deletion of a contact message by its ID.
func DeleteContact(c *fiber.Ctx) error {
	id := c.Params("id")

	// Parse the ID as uuid.UUID
	contactID, err := uuid.Parse(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid contact ID",
		})
	}

	// Create database connection
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Delete the contact message
	if err := db.DeleteContact(contactID); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Return success response
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"msg":   "Message deleted successfully",
	})
}
