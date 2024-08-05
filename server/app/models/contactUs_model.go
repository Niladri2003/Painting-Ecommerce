package models

import (
	"time"
	"github.com/google/uuid"

)

// Contact represents a contact message
type Contact struct {
	ID          uuid.UUID     `json:"id" db:"id"`
	FirstName   string    `json:"first_name" db:"first_name"`
	LastName    string    `json:"last_name" db:"last_name"`
	Email       string    `json:"email" db:"email"`
	Phone       string    `json:"phone" db:"phone"`
	Subject     string    `json:"subject" db:"subject"`
	Message     string    `json:"message" db:"message"`
	SubmittedAt time.Time `json:"submitted_at" db:"submitted_at"`
	Replied     bool      `json:"replied" db:"replied"`
}

// NewContact represents the payload for creating a new contact message
type NewContact struct {
	FirstName string `json:"first_name" validate:"required"`
	LastName  string `json:"last_name" validate:"required"`
	Email     string `json:"email" validate:"required,email"`
	Phone     string `json:"phone" validate:"required"`
	Subject   string `json:"subject" validate:"required"`
	Message   string `json:"message" validate:"required"`
}
