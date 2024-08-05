package queries

import (
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/google/uuid"
)

// ContactQueries struct for contact-related queries
type ContactQueries struct {
	*sqlx.DB
}

// GetContactByID retrieves a contact message by its ID.
func (q *ContactQueries) GetContactByID(id uuid.UUID) (models.Contact, error) {
	contact := models.Contact{}

	query := `SELECT * FROM contacts WHERE id = $1`
	err := q.Get(&contact, query, id)
	if err != nil {
		return contact, err
	}
	return contact, nil
}

// CreateContact inserts a new contact message into the database and returns the UUID of the new contact.
func (q *ContactQueries) CreateContact(c *models.NewContact) (uuid.UUID, error) {
	var id uuid.UUID
	query := `
		INSERT INTO contacts (first_name, last_name, email, phone, subject, message, submitted_at, replied)
		VALUES ($1, $2, $3, $4, $5, $6, NOW(), false)
		RETURNING id;
	`

	err := q.QueryRowx(query, c.FirstName, c.LastName, c.Email, c.Phone, c.Subject, c.Message).Scan(&id)
	if err != nil {
		return uuid.Nil, err
	}
	return id, nil
}

// UpdateContact sets the replied status for a contact message.
func (q *ContactQueries) UpdateContact(id uuid.UUID, replied bool) error {
	query := `UPDATE contacts SET replied = $1 WHERE id = $2`
	_, err := q.Exec(query, replied, id)
	if err != nil {
		return err
	}
	return nil
}

// DeleteContact removes a contact message from the database.
func (q *ContactQueries) DeleteContact(id uuid.UUID) error {
	query := `DELETE FROM contacts WHERE id = $1`
	_, err := q.Exec(query, id)
	if err != nil {
		return err
	}
	return nil
}

// GetAllContacts retrieves all contact messages from the database.
func (q *ContactQueries) GetAllContacts() ([]models.Contact, error) {
	var contacts []models.Contact
	query := `SELECT * FROM contacts`
	err := q.Select(&contacts, query)
	if err != nil {
		return nil, err
	}
	return contacts, nil
}
