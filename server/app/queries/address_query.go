package queries

import (
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

// AddressQueries struct for queries from Address model.
type AddressQueries struct {
	*sqlx.DB
}

// GetAddresses method for getting all addresses.
func (q *AddressQueries) GetAddresses() ([]models.Address, error) {
	// Define addresses variable.
	addresses := []models.Address{}

	// Define query string.
	query := `SELECT * FROM addresses`

	// Send query to database.
	err := q.Select(&addresses, query)
	if err != nil {
		return nil, err
	}

	return addresses, nil
}

// CreateAddress method for creating address by given Address object.
func (q *AddressQueries) CreateAddress(a *models.Address) (uuid.UUID, error) {
	var id uuid.UUID
	query := `
		INSERT INTO addresses (
			id, user_id, first_name, last_name, country, street_address,
			town_city, state, pin_code, mobile_number, email, order_notes,
			created_at, updated_at
		)
		VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
		)
		RETURNING id;
	`

	err := q.QueryRowx(query,
		a.ID, a.UserID, a.FirstName, a.LastName, a.Country, a.StreetAddress,
		a.TownCity, a.State, a.PinCode, a.MobileNumber, a.Email, a.OrderNotes,
		a.CreatedAt, a.UpdatedAt,
	).Scan(&id)
	if err != nil {
		return uuid.Nil, err
	}
	return id, nil
}

// UpdateAddress method for updating address by given Address object.
func (q *AddressQueries) UpdateAddress(id uuid.UUID, a *models.Address) error {
	// Define query string.
	query := `
		UPDATE addresses SET
			user_id = $2, first_name = $3, last_name = $4, country = $5,
			street_address = $6, town_city = $7, state = $8, pin_code = $9,
			mobile_number = $10, email = $11, order_notes = $12, updated_at = $13
		WHERE id = $1
	`

	// Send query to database.
	_, err := q.Exec(
		query,
		id, a.UserID, a.FirstName, a.LastName, a.Country, a.StreetAddress,
		a.TownCity, a.State, a.PinCode, a.MobileNumber, a.Email, a.OrderNotes,
		a.UpdatedAt,
	)
	if err != nil {
		return err
	}

	return nil
}

func (q *AddressQueries) UpdateAddressByUserID(userID uuid.UUID, a *models.Address) error {
	// Define query string.
	query := `
		UPDATE addresses
		SET first_name = $2, last_name = $3, country = $4, street_address = $5, town_city = $6, state = $7, pin_code = $8, mobile_number = $9, email = $10, order_notes = $11, updated_at = $12
		WHERE user_id = $1
	`

	// Send query to database.
	_, err := q.Exec(query, userID, a.FirstName, a.LastName, a.Country, a.StreetAddress, a.TownCity, a.State, a.PinCode, a.MobileNumber, a.Email, a.OrderNotes, a.UpdatedAt,)
	if err != nil {
		return err
	}

	return nil
}

// GetAddressesByUserID retrieves all addresses for a specific user ID.
func (q *AddressQueries) GetAddressesByUserID(userID uuid.UUID) ([]models.Address, error) {
	// Define a slice to hold multiple addresses.
	var addresses []models.Address

	// Define query string.
	query := `SELECT * FROM addresses WHERE user_id = $1`

	// Send query to database.
	err := q.Select(&addresses, query, userID)
	if err != nil {
		return nil, err
	}

	return addresses, nil
}

// DeleteAddressByUserID method for deleting an address by given UserID.
func (q *AddressQueries) DeleteAddressByUserID(userID uuid.UUID) error {
	// Define query string.
	query := `DELETE FROM addresses WHERE user_id = $1`

	// Send query to database.
	_, err := q.Exec(query, userID)
	if err != nil {
		return err
	}

	return nil
} 

// DeleteAddress method for deleting an address by given ID.
func (q *AddressQueries) DeleteAddress(id uuid.UUID) error {
	// Define query string.
	query := `DELETE FROM addresses WHERE id = $1`

	// Send query to database.
	_, err := q.Exec(query, id)
	if err != nil {
		return err
	}

	return nil
}
