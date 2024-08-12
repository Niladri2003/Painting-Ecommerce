package models

import (
	"github.com/google/uuid"
	"time"
)

// OrderItem represents the structure of an order item in the e-commerce application.
type OrderItem struct {
	ID          uuid.UUID `db:"id" json:"id"`
	OrderID     uuid.UUID `db:"order_id" json:"order_id"`
	ProductID   uuid.UUID `db:"product_id" json:"product_id"`
	ProductName string    `json:"product_name" db:"product_name"`
	Quantity    int       `db:"quantity" json:"quantity"`
	Price       float64   `db:"price" json:"price"`
	Status      string    `db:"status" json:"status"` //cancel or approve
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	UpdatedAt   time.Time `db:"updated_at" json:"updated_at"`
}
