package models

import (
	"github.com/google/uuid"
	"time"
)

// type User struct {
// 	ID           uuid.UUID `db:"id" json:"id" validate:"required,uuid"`
// 	CreatedAt    time.Time `db:"created_at" json:"created_at"`
// 	UpdatedAt    time.Time `db:"updated_at" json:"updated_at"`
// 	FirstName    string    `db:"first_name" json:"first_name"`
// 	LastName     string    `db:"last_name" json:"last_name"`
// 	Email        string    `db:"email" json:"email" validate:"required,email,lte=255"`
// 	PasswordHash string    `db:"password_hash" json:"password_hash,omitempty" validate:"required,lte=255"`
// 	UserStatus   int       `db:"user_status" json:"user_status" validate:"required,len=1"`
// 	UserRole     string    `db:"user_role" json:"user_role" validate:"required,lte=25"`
// }

type User struct {
	ID            uuid.UUID `db:"id" json:"id" validate:"required,uuid"`
	CreatedAt     time.Time `db:"created_at" json:"created_at"`
	UpdatedAt     time.Time `db:"updated_at" json:"updated_at"`
	FirstName     string    `db:"first_name" json:"first_name"`
	LastName      string    `db:"last_name" json:"last_name"`
	Email         string    `db:"email" json:"email" validate:"required,email,lte=255"`
	PasswordHash  string    `db:"password_hash" json:"password_hash,omitempty" validate:"required,lte=255"`
	UserStatus    int       `db:"user_status" json:"user_status" validate:"required,len=1"`
	UserRole      string    `db:"user_role" json:"user_role" validate:"required,lte=25"`
	GoogleID      *string   `db:"google_id" json:"google_id,omitempty"`
	ProfilePicture *string   `db:"profile_picture" json:"profile_picture,omitempty"` // Add this field
}

