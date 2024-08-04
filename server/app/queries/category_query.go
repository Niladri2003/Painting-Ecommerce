package queries

import (
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

type CategoryQueries struct {
	*sqlx.DB
}

// CreateCategory creates a new product category with the given details
func (q *CategoryQueries) CreateCategory(c *models.ProductCategory) error {
	query := `INSERT INTO categories (id, name, description) VALUES ($1, $2, $3)`

	_, err := q.Exec(
		query,
		c.ID, c.Name, c.Description,
	)
	if err != nil {
		return err
	}
	return nil
}

// DeleteCategory deletes a product category by ID
func (q *CategoryQueries) DeleteCategory(categoryID uuid.UUID) error {
	query := `DELETE FROM categories WHERE id = $1`

	_, err := q.Exec(query, categoryID)
	if err != nil {
		return err
	}
	return nil
}

// GetAllCategories retrieves all product categories
func (q *CategoryQueries) GetAllCategories() ([]models.ProductCategory, error) {
	query := `SELECT id, name, description FROM categories`

	rows, err := q.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []models.ProductCategory
	for rows.Next() {
		var c models.ProductCategory
		if err := rows.Scan(&c.ID, &c.Name, &c.Description); err != nil {
			return nil, err
		}
		categories = append(categories, c)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return categories, nil
}
