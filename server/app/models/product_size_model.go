package models

import "github.com/google/uuid"

type ProductSize struct {
	ID        uuid.UUID `db:"id" json:"id"`
	ProductID uuid.UUID `db:"product_id" json:"product_id"`
	Size      string    `db:"size" json:"size" `
	Charge    float64   `db:"charge" json:"charge"`
}
