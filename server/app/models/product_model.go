package models

import (
	"github.com/google/uuid"
	"time"
)

// Product represents the structure of a product in the e-commerce application.
type Product struct {
	ID              uuid.UUID `db:"id" json:"id"`
	Title           string    `db:"title" json:"title"`
	Description     string    `db:"description" json:"description"`
	OriginalPrice   float64   `db:"original_price" json:"original_price"`
	DiscountedPrice float64   `db:"discounted_price" json:"discounted_price"`
	IsActive        bool      `db:"is_active" json:"is_active"`
	CategoryID      uuid.UUID `db:"category_id" json:"category_id"`
	CreatedAt       time.Time `db:"created_at" json:"created_at"`
	UpdatedAt       time.Time `db:"updated_at" json:"updated_at"`
}

type AllProduct struct {
	ID              uuid.UUID            `db:"id" json:"id"`
	Title           string               `db:"title" json:"title"`
	Description     string               `db:"description" json:"description"`
	OriginalPrice   float64              `db:"original_price" json:"original_price"`
	DiscountedPrice float64              `db:"discounted_price" json:"discounted_price"`
	IsActive        bool                 `db:"is_active" json:"is_active"`
	CategoryID      uuid.UUID            `db:"category_id" json:"category_id"`
	CreatedAt       time.Time            `db:"created_at" json:"created_at"`
	UpdatedAt       time.Time            `db:"updated_at" json:"updated_at"`
	Sizes           []ProductSize        `json:"sizes"`
	SubCategory     []ProductSubCategory `json:"sub_category"`
	Images          []ProductImage       `json:"images"`
	Category        ProductCategory      `json:"category"`
}

type ProductImg struct {
	ID        uuid.UUID `db:"id" json:"id"`
	ProductID uuid.UUID `db:"product_id" json:"product_id"`
	ImageURL  string    `db:"image_url" json:"image_url"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

type CategoryWithProducts struct {
	CategoryName string       `json:"category_name"`
	Products     []AllProduct `json:"products"`
}
