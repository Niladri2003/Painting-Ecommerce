package queries

import (
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

// CartQueries struct for queries from Cart model.
type CartQueries struct {
	*sqlx.DB
}




/*


// GetCarts retrieves all carts.
func (q *CartQueries) GetCarts() ([]models.Cart, error) {
	// Define a slice to hold multiple carts.
	var carts []models.Cart

	// Define query string.
	query := `SELECT * FROM carts`

	// Send query to database.
	err := q.Select(&carts, query)
	if err != nil {
		return nil, err
	}

	return carts, nil
}

// CreateCart creates a new cart.
func (q *CartQueries) CreateCart(c *models.Cart) (uuid.UUID, error) {
	var id uuid.UUID
	query := `
		INSERT INTO carts (
			id, user_id, created_at, updated_at
		)
		VALUES (
			$1, $2, $3, $4
		)
		RETURNING id;
	`

	err := q.QueryRowx(query,
		c.ID, c.UserID, c.CreatedAt, c.UpdatedAt,
	).Scan(&id)
	if err != nil {
		return uuid.Nil, err
	}
	return id, nil
}

// AddItemToCart adds an item to the cart.
func (q *CartQueries) AddItemToCart(item *models.CartItem) error {
	query := `
		INSERT INTO cart_items (
			id, cart_id, product_id, quantity, price
		)
		VALUES (
			$1, $2, $3, $4, $5
		)
	`

	_, err := q.Exec(query,
		item.ID, item.CartID, item.ProductID, item.Quantity, item.Price,
	)
	if err != nil {
		return err
	}

	return nil
}

// UpdateCartItem updates the quantity of an item in the cart.
func (q *CartQueries) UpdateCartItem(item *models.CartItem) error {
	query := `
		UPDATE cart_items
		SET quantity = $2, price = $3
		WHERE id = $1
	`

	_, err := q.Exec(query,
		item.ID, item.Quantity, item.Price,
	)
	if err != nil {
		return err
	}

	return nil
}

// RemoveItemFromCart removes an item from the cart.
func (q *CartQueries) RemoveItemFromCart(itemID uuid.UUID) error {
	query := `
		DELETE FROM cart_items WHERE id = $1
	`

	_, err := q.Exec(query, itemID)
	if err != nil {
		return err
	}

	return nil
}

// GetCartByUserID retrieves a cart for a specific user ID.
func (q *CartQueries) GetCartByUserID(userID uuid.UUID) (models.Cart, error) {
	var cart models.Cart

	// Define query string for getting the cart.
	query := `SELECT * FROM carts WHERE user_id = $1`

	// Send query to database.
	err := q.Get(&cart, query, userID)
	if err != nil {
		return cart, err
	}

	// Fetch cart items
	itemsQuery := `SELECT * FROM cart_items WHERE cart_id = $1`
	err = q.Select(&cart.Items, itemsQuery, cart.ID)
	if err != nil {
		return cart, err
	}

	return cart, nil
}

// DeleteCart deletes a cart by its ID.
func (q *CartQueries) DeleteCart(cartID uuid.UUID) error {
	// First delete cart items
	_, err := q.Exec(`DELETE FROM cart_items WHERE cart_id = $1`, cartID)
	if err != nil {
		return err
	}

	// Then delete the cart
	_, err = q.Exec(`DELETE FROM carts WHERE id = $1`, cartID)
	if err != nil {
		return err
	}

	return nil
}
*/



// CreateCart inserts a new cart into the database.
func (q *CartQueries) CreateCart(cart *models.Cart) error {
	query := `
		INSERT INTO carts (id, user_id, created_at, updated_at)
		VALUES ($1, $2, $3, $4)
		RETURNING id`
	err := q.Get(&cart.ID, query, cart.ID, cart.UserID, cart.CreatedAt, cart.UpdatedAt)
	return err
}

// AddItemToCart inserts a new item into the cart_items table.
func (q *CartQueries) AddItemToCart(item *models.CartItem) error {
	query := `
		INSERT INTO cart_items (id, cart_id, product_id, quantity, price, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7)`
	_, err := q.Exec(query, item.ID, item.CartID, item.ProductID, item.Quantity, item.Price, item.CreatedAt, item.UpdatedAt)
	return err
}

// UpdateCartItem updates an existing item in the cart_items table.
func (q *CartQueries) UpdateCartItem(item *models.CartItem) error {
	query := `
		UPDATE cart_items
		SET quantity = $1, price = $2, updated_at = $3
		WHERE id = $4`
	_, err := q.Exec(query, item.Quantity, item.Price, item.UpdatedAt, item.ID)
	return err
}

// RemoveItemFromCart removes an item from the cart_items table.
func (q *CartQueries) RemoveItemFromCart(itemID uuid.UUID) error {
	query := `DELETE FROM cart_items WHERE id = $1`
	_, err := q.Exec(query, itemID)
	return err
}

// GetCartByUserID retrieves a cart and its items for a specific user ID.
func (q *CartQueries) GetCartByUserID(userID uuid.UUID) (models.Cart, error) {
	var cart models.Cart

	// Query to fetch the cart
	query := `SELECT * FROM carts WHERE user_id = $1`
	err := q.Get(&cart, query, userID)
	if err != nil {
		return cart, err
	}

	// Query to fetch the cart items
	itemsQuery := `SELECT * FROM cart_items WHERE cart_id = $1`
	err = q.Select(&cart.Items, itemsQuery, cart.ID)
	if err != nil {
		return cart, err
	}

	return cart, nil
}

// DeleteCart deletes a cart and its items for a specific user ID.
func (q *CartQueries) DeleteCart(userID uuid.UUID) error {
	// Delete cart items first
	_, err := q.Exec(`DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM carts WHERE user_id = $1)`, userID)
	if err != nil {
		return err
	}

	// Delete the cart
	_, err = q.Exec(`DELETE FROM carts WHERE user_id = $1`, userID)
	return err
}