package queries

import (
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

// ProductQueries struct for queries from Product model.
type ProductQueries struct {
	*sqlx.DB
}

// GetProducts method for getting all products.
func (q *ProductQueries) GetProducts() ([]models.AllProduct, error) {
	// Define the query.
	query := `
	SELECT
		p.id AS product_id,
		p.title,
		p.description,
		p.price,
		pi.id AS image_id,
		pi.image_url,
		pi.created_at AS image_created_at,
		c.id AS category_id,
		c.name AS category_name
	FROM
		products p
	LEFT JOIN
		product_images pi
	ON
		p.id = pi.product_id
	LEFT JOIN
		categories c
	ON
		p.category_id = c.id
	ORDER BY
		p.id, pi.created_at;
	`

	// Create a slice to hold the results.
	rows, err := q.DB.Queryx(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Map to hold products and their images.
	productsMap := make(map[string]*models.AllProduct)
	imagesMap := make(map[string][]models.ProductImage)

	for rows.Next() {
		var p models.AllProduct
		var pi models.ProductImage
		var categoryID uuid.UUID
		var categoryName string

		// Scan the row into variables.
		if err := rows.Scan(
			&p.ID,
			&p.Title,
			&p.Description,
			&p.Price,
			&pi.ID,
			&pi.ImageURL,
			&pi.CreatedAt,
			&categoryID,
			&categoryName,
		); err != nil {
			return nil, err
		}

		// Initialize category details.
		if categoryID != uuid.Nil {
			p.Category = models.ProductCategory{
				ID:   categoryID,
				Name: categoryName,
			}
		}

		productIDStr := p.ID.String()

		// Add the product to the map if not already added.
		if _, exists := productsMap[productIDStr]; !exists {
			productsMap[productIDStr] = &p
		}

		// Append image to the product's image slice.
		if pi.ID != uuid.Nil {
			imagesMap[productIDStr] = append(imagesMap[productIDStr], pi)
		}
	}

	// Convert map to slice.
	var products []models.AllProduct
	for id, product := range productsMap {
		// Attach images to the product.
		product.Images = imagesMap[id]
		products = append(products, *product)
	}

	return products, nil
}
func (q *ProductQueries) GetProductsByCategory(categoryID uuid.UUID) ([]models.AllProduct, error) {
	// Define the query.
	query := `
	SELECT
		p.id AS product_id,
		p.title,
		p.description,
		p.price,
		pi.id AS image_id,
		pi.image_url,
		pi.created_at AS image_created_at,
		c.id AS category_id,
		c.name AS category_name
	FROM
		products p
	LEFT JOIN
		product_images pi
	ON
		p.id = pi.product_id
	LEFT JOIN
		categories c
	ON
		p.category_id = c.id
	WHERE
		p.category_id = $1
	ORDER BY
		p.id, pi.created_at;
	`

	// Create a slice to hold the results.
	rows, err := q.DB.Queryx(query, categoryID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Map to hold products and their images.
	productsMap := make(map[string]*models.AllProduct)
	imagesMap := make(map[string][]models.ProductImage)

	for rows.Next() {
		var p models.AllProduct
		var pi models.ProductImage
		var categoryID uuid.UUID
		var categoryName string

		// Scan the row into variables.
		if err := rows.Scan(
			&p.ID,
			&p.Title,
			&p.Description,
			&p.Price,
			&pi.ID,
			&pi.ImageURL,
			&pi.CreatedAt,
			&categoryID,
			&categoryName,
		); err != nil {
			return nil, err
		}

		// Initialize category details.
		if categoryID != uuid.Nil {
			p.Category = models.ProductCategory{
				ID:   categoryID,
				Name: categoryName,
			}
		}

		productIDStr := p.ID.String()

		// Add the product to the map if not already added.
		if _, exists := productsMap[productIDStr]; !exists {
			productsMap[productIDStr] = &p
		}

		// Append image to the product's image slice.
		if pi.ID != uuid.Nil {
			imagesMap[productIDStr] = append(imagesMap[productIDStr], pi)
		}
	}

	// Convert map to slice.
	var products []models.AllProduct
	for id, product := range productsMap {
		// Attach images to the product.
		product.Images = imagesMap[id]
		products = append(products, *product)
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
