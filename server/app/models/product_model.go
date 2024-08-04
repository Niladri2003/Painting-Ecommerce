package models

import (
	"github.com/google/uuid"
	"time"
)

// Product represents the structure of a product in the e-commerce application.
type Product struct {
	ID          uuid.UUID `db:"id" json:"id"`
	Title       string    `db:"title" json:"title"`
	Description string    `db:"description" json:"description"`
	Price       float64   `db:"price" json:"price"`
	CategoryID  uuid.UUID `db:"category_id" json:"category_id"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	UpdatedAt   time.Time `db:"updated_at" json:"updated_at"`
}
