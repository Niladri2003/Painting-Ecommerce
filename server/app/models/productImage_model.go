package models

import (
	"github.com/google/uuid"
	"time"
)

// ProductImage represents the structure of a product image in the e-commerce application.
type ProductImage struct {
	ID        uuid.UUID `db:"id" json:"id"`
	ProductID uuid.UUID `db:"product_id" json:"product_id"`
	ImageURL  string    `db:"image_url" json:"image_url"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
