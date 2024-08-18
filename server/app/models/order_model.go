package models

import (
	"github.com/google/uuid"
	"time"
)

// Order represents the structure of an order in the e-commerce application.
type Order struct {
	ID         uuid.UUID `db:"id" json:"id"`
	UserID     uuid.UUID `db:"user_id" json:"user_id"`
	CouponCode string    `json:"coupon_code" db:"coupon_code"`
	Total      float64   `db:"total" json:"total"`
	Status     string    `db:"status" json:"status"`
	AddressID  uuid.UUID `db:"address_id" json:"address_id"`
	InvoiceUrl string    `db:"invoice_url" json:"invoice_url"`
	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}
type OrderWithItems struct {
	// Order Fields
	OrderID        uuid.UUID `json:"order_id"`
	UserID         uuid.UUID `json:"user_id"`
	Total          float64   `json:"total"`
	CouponCode     string    `json:"coupon_code"`
	OrderStatus    string    `json:"order_status"`
	InvoiceURL     string    `json:"invoice_url"`
	OrderCreatedAt time.Time `json:"order_created_at"`
	OrderUpdatedAt time.Time `json:"order_updated_at"`

	// Address Fields
	Address []Address `json:"addresses"`

	// Order Item Fields
	OrderItems []OrderItem `json:"order_items"` // Slice of order items
}
