package models

import (
	"time"

	"github.com/google/uuid"
)

// Cart represents a user's shopping cart.
type Cart struct {
	ID                  uuid.UUID  `json:"id" db:"id"`
	UserID              uuid.UUID  `json:"user_id" db:"user_id"`
	IsCouponCodeApplied bool       `json:"is_coupon_applied" db:"is_coupon_applied"`
	CouponCode          string     `json:"coupon_code" db:"coupon_code"`
	Discountpercentage  float64    `json:"discount_percentage" db:"discount_percentage"`
	Items               []CartItem `json:"items"`
	CreatedAt           time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt           time.Time  `json:"updated_at" db:"updated_at"`
}

// CartItem represents an item in a cart.
type CartItem struct {
	ID                      uuid.UUID `json:"id" db:"id"`
	CartID                  uuid.UUID `json:"cart_id" db:"cart_id"`
	ProductID               uuid.UUID `json:"product_id" db:"product_id"`
	ProductName             string    `json:"product_name" db:"product_name"`
	Quantity                int       `json:"quantity" db:"quantity"`
	QuantityPrice           float64   `json:"quantity_price" db:"quantity_price"`
	TotalPrice              float64   `json:"price" db:"total_price"`
	ProductSizeId           uuid.UUID `json:"product_size_id" db:"product_size_id"`
	ProductSubCategoryId    uuid.UUID `json:"product_sub_category" db:"product_subcategory_id"`
	Size                    string    `db:"size" json:"size"`
	Subcategory             string    `db:"subcategory" json:"subcategory"`
	AfterDiscountTotalPrice float64   `json:"after_discount_total_price" db:"after_discount_total_price"`
	CreatedAt               time.Time `json:"created_at" db:"created_at"`
	UpdatedAt               time.Time `json:"updated_at" db:"updated_at"`
}
