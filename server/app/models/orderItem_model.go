package models

import (
	"github.com/google/uuid"
	"time"
)

// OrderItem represents the structure of an order item in the e-commerce application.
type OrderItem struct {
	ID        uuid.UUID `db:"id" json:"id"`
	OrderID   uuid.UUID `db:"order_id" json:"order_id"`
	ProductID uuid.UUID `db:"product_id" json:"product_id"`
	Quantity  int       `db:"quantity" json:"quantity"`
	Price     float64   `db:"price" json:"price"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
