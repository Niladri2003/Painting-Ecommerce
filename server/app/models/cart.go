package models

import (
	"time"

	"github.com/google/uuid"
)

/*
// Cart represents a shopping cart.
type Cart struct {
	ID        uuid.UUID   `json:"id" db:"id"`
	UserID    uuid.UUID   `json:"user_id" db:"user_id"`
	Items     []CartItem  `json:"items"`
	CreatedAt string      `json:"created_at" db:"created_at"`
	UpdatedAt string      `json:"updated_at" db:"updated_at"`
}

// CartItem represents an item in a cart.
type CartItem struct {
	ID        uuid.UUID `json:"id" db:"id"`
	CartID    uuid.UUID `json:"cart_id" db:"cart_id"`
	ProductID uuid.UUID `json:"product_id" db:"product_id"`
	Quantity  int       `json:"quantity" db:"quantity"`
	Price     float64   `json:"price" db:"price"`
}
*/

// Cart represents a user's shopping cart.
type Cart struct {
	ID        uuid.UUID   `json:"id" db:"id"`
	UserID    uuid.UUID   `json:"user_id" db:"user_id"`
	Items     []CartItem  `json:"items"`
	CreatedAt time.Time   `json:"created_at" db:"created_at"`
	UpdatedAt time.Time   `json:"updated_at" db:"updated_at"`
}

// CartItem represents an item in a cart.
type CartItem struct {
	ID        uuid.UUID `json:"id" db:"id"`
	CartID    uuid.UUID `json:"cart_id" db:"cart_id"`
	ProductID uuid.UUID `json:"product_id" db:"product_id"`
	Quantity  int       `json:"quantity" db:"quantity"`
	TotalPrice     float64   `json:"price" db:"total_price"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}