package models

import "github.com/google/uuid"

type ProductSubCategory struct {
	ID          uuid.UUID `db:"id" json:"id" `
	ProductID   uuid.UUID `db:"product_id" json:"product_id"`
	Subcategory string    `db:"subcategory" json:"subcategory" `
	Charge      float64   `db:"charge" json:"charge"`
}
