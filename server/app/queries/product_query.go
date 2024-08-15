package queries

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

// ProductQueries struct for queries from Product model.
type ProductQueries struct {
	*sqlx.DB
}

// CreateProduct method for creating product by given Product object.
func (q *ProductQueries) CreateProduct(p *models.Product) error {
	// Define query string.
	query := `INSERT INTO products (id, title, description, original_price,discounted_price,is_active, category_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)`

	// Send query to database.
	_, err := q.Exec(query, p.ID, p.Title, p.Description, p.OriginalPrice, p.DiscountedPrice, p.IsActive, p.CategoryID, p.CreatedAt, p.UpdatedAt)
	if err != nil {
		fmt.Println("product Creation error")
		return err
	}

	return nil
}

// GetProducts method for getting all products.
// GetProducts method for getting all products including sizes and subcategories.
func (q *ProductQueries) GetProducts() ([]models.AllProduct, error) {
	// Define the query.
	query := `
	SELECT
		p.id AS product_id,
		p.title,
		p.description,
		p.original_price,
		p.discounted_price,
		p.is_active,
		pi.id AS image_id,
		pi.image_url,
		pi.created_at AS image_created_at,
		c.id AS category_id,
		c.name AS category_name,
		ps.id AS size_id,
		COALESCE(ps.size, '') AS size,
		COALESCE(ps.charge, 0) AS size_charge,
		sc.id AS subcategory_id,
		COALESCE(sc.subcategory, '') AS subcategory,
		COALESCE(sc.charge, 0) AS subcategory_charge
	FROM
		products p
	LEFT JOIN
		product_images pi ON p.id = pi.product_id
	LEFT JOIN
		categories c ON p.category_id = c.id
	LEFT JOIN
		products_size ps ON p.id = ps.product_id
	LEFT JOIN
		products_subcategory sc ON p.id = sc.product_id
	ORDER BY
		p.id, pi.created_at, ps.size, sc.subcategory;
	`

	// Create a slice to hold the results.
	rows, err := q.DB.Queryx(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Map to hold products and their details.
	productsMap := make(map[string]*models.AllProduct)
	imagesMap := make(map[string][]models.ProductImage)
	sizesMap := make(map[string][]models.ProductSize)
	subcategoriesMap := make(map[string][]models.ProductSubCategory)

	for rows.Next() {
		var p models.AllProduct
		var pi models.ProductImage
		var ps models.ProductSize
		var sc models.ProductSubCategory
		var categoryID uuid.UUID
		var categoryName string

		// Scan the row into variables.
		if err := rows.Scan(
			&p.ID,
			&p.Title,
			&p.Description,
			&p.OriginalPrice,
			&p.DiscountedPrice,
			&p.IsActive,
			&pi.ID,
			&pi.ImageURL,
			&pi.CreatedAt,
			&categoryID,
			&categoryName,
			&ps.ID,
			&ps.Size,
			&ps.Charge,
			&sc.ID,
			&sc.Subcategory,
			&sc.Charge,
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

		// Append size to the product's size slice.
		if ps.ID != uuid.Nil {
			sizesMap[productIDStr] = append(sizesMap[productIDStr], ps)
		}

		// Append subcategory to the product's subcategory slice.
		if sc.ID != uuid.Nil {
			subcategoriesMap[productIDStr] = append(subcategoriesMap[productIDStr], sc)
		}
	}

	// Convert map to slice.
	var products []models.AllProduct
	for id, product := range productsMap {
		// Attach images, sizes, and subcategories to the product.
		product.Images = imagesMap[id]
		product.Sizes = sizesMap[id]
		product.SubCategory = subcategoriesMap[id]
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
		p.original_price,
		p.discounted_price,
		p.is_active,
		pi.id AS image_id,
		pi.image_url,
		pi.created_at AS image_created_at,
		c.id AS category_id,
		c.name AS category_name,
		ps.id AS size_id,
		ps.size,
		ps.charge AS size_charge,
		sc.id AS subcategory_id,
		sc.subcategory,
		sc.charge AS subcategory_charge
	FROM
		products p
	LEFT JOIN
		product_images pi ON p.id = pi.product_id
	LEFT JOIN
		categories c ON p.category_id = c.id
	LEFT JOIN
		products_size ps ON p.id = ps.product_id
	LEFT JOIN
		products_subcategory sc ON p.id = sc.product_id
	WHERE
		p.category_id = $1
	ORDER BY
		p.id, pi.created_at, ps.size, sc.subcategory;
	`

	// Create a slice to hold the results.
	rows, err := q.DB.Queryx(query, categoryID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Map to hold products and their details.
	productsMap := make(map[string]*models.AllProduct)
	imagesMap := make(map[string][]models.ProductImage)
	sizesMap := make(map[string][]models.ProductSize)
	subcategoriesMap := make(map[string][]models.ProductSubCategory)

	for rows.Next() {
		var p models.AllProduct
		var pi models.ProductImage
		var ps models.ProductSize
		var sc models.ProductSubCategory
		var catID uuid.UUID
		var categoryName string

		// Scan the row into variables.
		if err := rows.Scan(
			&p.ID,
			&p.Title,
			&p.Description,
			&p.OriginalPrice,
			&p.DiscountedPrice,
			&p.IsActive,
			&pi.ID,
			&pi.ImageURL,
			&pi.CreatedAt,
			&catID,
			&categoryName,
			&ps.ID,
			&ps.Size,
			&ps.Charge,
			&sc.ID,
			&sc.Subcategory,
			&sc.Charge,
		); err != nil {
			return nil, err
		}

		// Initialize category details.
		if catID != uuid.Nil {
			p.Category = models.ProductCategory{
				ID:   catID,
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

		// Append size to the product's size slice.
		if ps.ID != uuid.Nil {
			sizesMap[productIDStr] = append(sizesMap[productIDStr], ps)
		}

		// Append subcategory to the product's subcategory slice.
		if sc.ID != uuid.Nil {
			subcategoriesMap[productIDStr] = append(subcategoriesMap[productIDStr], sc)
		}
	}

	// Convert map to slice.
	var products []models.AllProduct
	for id, product := range productsMap {
		// Attach images, sizes, and subcategories to the product.
		product.Images = imagesMap[id]
		product.Sizes = sizesMap[id]
		product.SubCategory = subcategoriesMap[id]
		products = append(products, *product)
	}

	return products, nil
}

// GetProduct details method for getting one product by given ID.
func (q *ProductQueries) GetProduct(id uuid.UUID) (models.Product, error) {
	fmt.Println("Id=", id)
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

// UpdateProduct method for updating product by given Product object.
func (q *ProductQueries) UpdateProduct(id uuid.UUID, p *models.Product) error {
	// Define query string.
	query := `UPDATE products SET title = $2, description = $3, original_price = $4,discounted_price=$5, is_active=$6,category_id = $7, updated_at = $8 WHERE id = $1`

	// Send query to database.
	_, err := q.Exec(query, id, p.Title, p.Description, p.OriginalPrice, p.DiscountedPrice, p.IsActive, p.CategoryID, p.UpdatedAt)
	if err != nil {
		fmt.Println("Error while updating product", err)
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
		fmt.Println("Error deleting product: ", err)
		return err
	}

	return nil
}
