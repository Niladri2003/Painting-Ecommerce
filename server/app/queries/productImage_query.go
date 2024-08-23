package queries

import (
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

// ProductImageQueries struct for queries from ProductImage model.
type ProductImageQueries struct {
	*sqlx.DB
}

// GetImagesByProduct method for getting all images for a given product.
func (q *ProductImageQueries) GetImagesByProduct(productID uuid.UUID) ([]models.ProductImage, error) {
	// Define images variable.
	images := []models.ProductImage{}

	// Define query string.
	query := `SELECT * FROM product_images WHERE product_id = $1`

	// Send query to database.
	err := q.Select(&images, query, productID)
	if err != nil {
		return images, err
	}

	return images, nil
}

// CreateProductImage method for creating a product image by given ProductImage object.
func (q *ProductImageQueries) CreateProductImage(img *models.ProductImage) error {
	// Define query string.
	query := `INSERT INTO product_images (id, product_id, image_url, created_at) VALUES ($1, $2, $3, $4)`

	// Send query to database.
	_, err := q.Exec(query, img.ID, img.ProductID, img.ImageURL, img.CreatedAt)
	if err != nil {
		return err
	}

	return nil
}

// DeleteProductImage method for deleting a product image by given ID.
func (q *ProductImageQueries) DeleteProductImage(id uuid.UUID) error {
	// Define query string.
	query := `DELETE FROM product_images WHERE id = $1`

	// Send query to database.
	_, err := q.Exec(query, id)
	if err != nil {
		return err
	}

	return nil
}

// Get the first uploaded single image of a product
func (q *ProductImageQueries) GetProductImageForCart(id uuid.UUID) (*models.ProductImage, error) {
	images := []models.ProductImage{}
	query := `SELECT * FROM product_images WHERE product_id = $1 ORDER BY created_at LIMIT 1`
	err := q.Select(&images, query, id)
	if err != nil {
		return nil, err
	}
	if len(images) == 0 {
		return nil, nil
	}
	return &images[0], nil
}
