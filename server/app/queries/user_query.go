package queries

import (

	"fmt"

	"time"


	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"strings"
)

type UserQueries struct {
	*sqlx.DB
}

// GetUserByID query for getting one User by given ID.
func (q *UserQueries) GetUserByID(id uuid.UUID) (models.User, error) {
	user := models.User{}

	//define query string
	query := `SELECT * FROM users WHERE id = $1`

	//send query to database
	err := q.Get(&user, query, id)
	if err != nil {
		//return empty object and error.
		return user, err
	}
	//Return query result
	return user, nil
}

// GetUserByEmail query for getting one User by given Email.
func (q *UserQueries) GetUserByEmail(email string) (models.User, error) {
	fmt.Println("Email inside Query-", email)
	email = strings.TrimSpace(email)
	// Define User variable.
	user := models.User{}

	// Define query string.
	query := `SELECT * FROM users WHERE email = $1`
	fmt.Println("Executing query:", query, "with email:", email)
	// Send query to database.
	err := q.Get(&user, query, email)
	fmt.Println(user)
	if err != nil {
		// Return empty object and error.
		fmt.Println("ErrorExecutiong query ", err)
		return user, err
	}

	// Return query result.
	return user, nil
}

// CreateUser query for creating a new user by given email and password hash
func (q *UserQueries) CreateUser(u *models.User) error {
	query := `INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)`
	// Send query to database
	_, err := q.Exec(
		query,
		u.ID, u.CreatedAt, u.UpdatedAt, u.FirstName, u.LastName, u.Email, u.PasswordHash, u.UserStatus, u.UserRole,
	)
	if err != nil {
		return err
	}
	return nil
}

// UpdateUserPassword updates the user's password in the database.
func (q *UserQueries) UpdateUserPassword(id uuid.UUID, newPassword string) error {
    query := `UPDATE users SET password_hash = $1, updated_at = $2 WHERE id = $3`
    _, err := q.Exec(query, newPassword, time.Now(), id)
    return err
}

// DeleteUserByID deletes a user from the database by their ID.
func (q *UserQueries) DeleteUserByID(id uuid.UUID) error {
    query := `DELETE FROM users WHERE id = $1`
    _, err := q.Exec(query, id)
    return err
}

func (q *UserQueries) GetUserByOrderId(orderId uuid.UUID) (models.User, error) {
	user := models.User{}

	query := `SELECT users.* FROM users JOIN orders ON users.id = orders.user_id WHERE orders.id = $1`

	err := q.Get(&user, query, orderId)
	if err != nil {
		return user, err
	}

	return user, nil
}


// UpdateUserProfilePicture updates the user's profile picture and updated_at timestamp in the database.
func (q *UserQueries) UpdateUserProfilePicture(user *models.User) error {
	query := `UPDATE users SET profile_picture = $1, updated_at = $2 WHERE id = $3`
	_, err := q.Exec(query, user.ProfilePicture, time.Now(), user.ID)
	return err
}
