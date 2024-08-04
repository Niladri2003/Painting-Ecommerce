package queries

import (
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	// Update with your actual module path
)

// ProductQueries struct for queries from Product model.
type ProductQueries struct {
	*sqlx.DB
}

// GetProducts method for getting all products.
func (q *ProductQueries) GetProducts() ([]models.Product, error) {
	// Define products variable.
	products := []models.Product{}

	// Define query string.
	query := `SELECT * FROM products`

	// Send query to database.
	err := q.Select(&products, query)
	if err != nil {
		return products, err
	}

	return products, nil
}

// GetProduct method for getting one product by given ID.
func (q *ProductQueries) GetProduct(id uuid.UUID) (models.Product, error) {
	// Define product variable.
	product := models.Product{}

	// Define query string.
	query := `SELECT * FROM products WHERE id = $1`

	// Send query to database.
	err := q.Get(&product, query, id)
	if err != nil {
		return product, err
	}

	return product, nil
}

// CreateProduct method for creating product by given Product object.
func (q *ProductQueries) CreateProduct(p *models.Product) error {
	// Define query string.
	query := `INSERT INTO products (id, title, description, price, category_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`

	// Send query to database.
	_, err := q.Exec(query, p.ID, p.Title, p.Description, p.Price, p.CategoryID, p.CreatedAt, p.UpdatedAt)
	if err != nil {
		return err
	}

	return nil
}

// UpdateProduct method for updating product by given Product object.
func (q *ProductQueries) UpdateProduct(id uuid.UUID, p *models.Product) error {
	// Define query string.
	query := `UPDATE products SET title = $2, description = $3, price = $4, category_id = $5, updated_at = $6 WHERE id = $1`

	// Send query to database.
	_, err := q.Exec(query, id, p.Title, p.Description, p.Price, p.CategoryID, p.UpdatedAt)
	if err != nil {
		return err
	}

	return nil
}

// DeleteProduct method for deleting product by given ID.
func (q *ProductQueries) DeleteProduct(id uuid.UUID) error {
	// Define query string.
	query := `DELETE FROM products WHERE id = $1`

	// Send query to database.
	_, err := q.Exec(query, id)
	if err != nil {
		return err
	}

	return nil
}
