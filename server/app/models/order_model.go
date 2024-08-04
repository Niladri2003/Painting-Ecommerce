package models

import (
	"github.com/google/uuid"
	"time"
)

// Order represents the structure of an order in the e-commerce application.
type Order struct {
	ID        uuid.UUID `db:"id" json:"id"`
	UserID    uuid.UUID `db:"user_id" json:"user_id"`
	Total     float64   `db:"total" json:"total"`
	Status    string    `db:"status" json:"status"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
