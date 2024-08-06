package models

import "github.com/google/uuid"

// Address represents the address information in the system.
type Address struct {
    ID            uuid.UUID `json:"id" db:"id"`
    UserID        uuid.UUID `json:"user_id" db:"user_id"`  // Foreign key for the user
    FirstName     string    `json:"first_name" db:"first_name"`
    LastName      string    `json:"last_name" db:"last_name"`
    Country       string    `json:"country" db:"country"`
    StreetAddress string    `json:"street_address" db:"street_address"`
    TownCity      string    `json:"town_city" db:"town_city"`
    State         string    `json:"state" db:"state"`
    PinCode       string    `json:"pin_code" db:"pin_code"`
    MobileNumber  string    `json:"mobile_number" db:"mobile_number"`
    Email         string    `json:"email" db:"email"`
    OrderNotes    *string   `json:"order_notes,omitempty" db:"order_notes"`  // Optional field
    CreatedAt     string    `json:"created_at" db:"created_at"`
    UpdatedAt     string    `json:"updated_at" db:"updated_at"`
}


// AddressForm represents the data structure for creating or updating an address.
type AddressForm struct {
	UserID        uuid.UUID `json:"user_id"`
	FirstName     string    `json:"first_name"`
	LastName      string    `json:"last_name"`
	Country       string    `json:"country"`
	StreetAddress string    `json:"street_address"`
	TownCity      string    `json:"town_city"`
	State         string    `json:"state"`
	PinCode       string    `json:"pin_code"`
	MobileNumber  string    `json:"mobile_number"`
	Email         string    `json:"email"`
	OrderNotes    *string   `json:"order_notes,omitempty"` // Optional field
}
