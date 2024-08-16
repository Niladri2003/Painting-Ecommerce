package queries

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"time"
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
func (q *ProductQueries) GetAllProducts() ([]models.AllProduct, error) {
	query := `
        SELECT
            p.id AS product_id,
            p.title,
            p.description,
            p.original_price,
            p.discounted_price,
            p.is_active,
            p.category_id,
            to_char(p.created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS created_at,
            to_char(p.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS updated_at,
            c.id AS category_id,
            c.name AS category_name,
            array_agg(DISTINCT pi.id) FILTER (WHERE pi.id IS NOT NULL) AS image_ids,
            array_agg(DISTINCT pi.image_url) FILTER (WHERE pi.id IS NOT NULL) AS image_urls,
            array_agg(DISTINCT ps.id) FILTER (WHERE ps.id IS NOT NULL) AS size_ids,
            array_agg(DISTINCT COALESCE(ps.size, '')) AS sizes,
            array_agg(DISTINCT COALESCE(ps.charge, 0)) AS size_charges,
            array_agg(DISTINCT sc.id) FILTER (WHERE sc.id IS NOT NULL) AS subcategory_ids,
            array_agg(DISTINCT COALESCE(sc.subcategory, '')) AS subcategories,
            array_agg(DISTINCT COALESCE(sc.charge, 0)) AS subcategory_charges
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
            p.is_active = true
        GROUP BY
            p.id, c.id
        ORDER BY
            p.id;
    `

	rows, err := q.DB.Queryx(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []models.AllProduct
	for rows.Next() {
		var product models.AllProduct
		var category models.ProductCategory
		var imageIDs []uuid.UUID
		var imageURLs []string
		var sizeIDs []uuid.UUID
		var sizes []string
		var sizeCharges []float64
		var subcategoryIDs []uuid.UUID
		var subcategories []string
		var subcategoryCharges []float64
		var createdAtStr, updatedAtStr string

		err := rows.Scan(
			&product.ID,
			&product.Title,
			&product.Description,
			&product.OriginalPrice,
			&product.DiscountedPrice,
			&product.IsActive,
			&product.CategoryID,
			&createdAtStr,
			&updatedAtStr,
			&category.ID,
			&category.Name,
			pq.Array(&imageIDs),
			pq.Array(&imageURLs),
			pq.Array(&sizeIDs),
			pq.Array(&sizes),
			pq.Array(&sizeCharges),
			pq.Array(&subcategoryIDs),
			pq.Array(&subcategories),
			pq.Array(&subcategoryCharges),
		)
		if err != nil {
			return nil, err
		}

		// Parse the timestamps
		product.CreatedAt, err = time.Parse("2006-01-02T15:04:05Z07:00", createdAtStr)
		if err != nil {
			return nil, err
		}

		product.UpdatedAt, err = time.Parse("2006-01-02T15:04:05Z07:00", updatedAtStr)
		if err != nil {
			return nil, err
		}

		// Assign images (check lengths)
		if len(imageIDs) == len(imageURLs) {
			fmt.Println("true")
			for i := range imageIDs {
				product.Images = append(product.Images, models.ProductImage{
					ID:        imageIDs[i],
					ProductID: product.ID,
					ImageURL:  imageURLs[i],
				})
			}
		}

		// Assign sizes (check lengths)
		// Assign sizes (check lengths)
		fmt.Printf("SizeIDs: %v\n", sizeIDs)
		fmt.Printf("Sizes: %v\n", sizes)
		fmt.Printf("SizeCharges: %v\n", sizeCharges)
		if len(sizeIDs) == len(sizes) && len(sizeIDs) == len(sizeCharges) {
			fmt.Println("True")
			for i := range sizeIDs {
				product.Sizes = append(product.Sizes, models.ProductSize{
					ID:     sizeIDs[i],
					Size:   sizes[i],
					Charge: sizeCharges[i],
				})
			}
		} else {
			fmt.Println("Size arrays lengths do not match")
		}

		// Assign subcategories (check lengths)
		if len(subcategoryIDs) == len(subcategories) && len(subcategoryIDs) == len(subcategoryCharges) {
			for i := range subcategoryIDs {
				product.SubCategory = append(product.SubCategory, models.ProductSubCategory{
					ID:          subcategoryIDs[i],
					ProductID:   product.ID,
					Subcategory: subcategories[i],
					Charge:      subcategoryCharges[i],
				})
			}
		}

		// Assign category
		product.Category = category

		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}

func (q *ProductQueries) GetProductsByCategory(categoryID uuid.UUID) ([]models.AllProduct, error) {
	query := `
		SELECT
			p.id AS product_id,
			p.title,
			p.description,
			p.original_price,
			p.discounted_price,
			p.is_active,
			p.category_id,
			to_char(p.created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS created_at,
			to_char(p.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS updated_at,
			c.id AS category_id,
			c.name AS category_name,
			array_agg(DISTINCT pi.id) FILTER (WHERE pi.id IS NOT NULL) AS image_ids,
			array_agg(DISTINCT pi.image_url) FILTER (WHERE pi.id IS NOT NULL) AS image_urls,
			array_agg(DISTINCT ps.id) FILTER (WHERE ps.id IS NOT NULL) AS size_ids,
			array_agg(DISTINCT COALESCE(ps.size, '')) AS sizes,
			array_agg(DISTINCT COALESCE(ps.charge, 0)) AS size_charges,
			array_agg(DISTINCT sc.id) FILTER (WHERE sc.id IS NOT NULL) AS subcategory_ids,
			array_agg(DISTINCT COALESCE(sc.subcategory, '')) AS subcategories,
			array_agg(DISTINCT COALESCE(sc.charge, 0)) AS subcategory_charges
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
		GROUP BY
			p.id, c.id
		ORDER BY
			p.id;
	`

	rows, err := q.DB.Queryx(query, categoryID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []models.AllProduct
	for rows.Next() {
		var product models.AllProduct
		var category models.ProductCategory
		var imageIDs []uuid.UUID
		var imageURLs []string
		var sizeIDs []uuid.UUID
		var sizes []string
		var sizeCharges []float64
		var subcategoryIDs []uuid.UUID
		var subcategories []string
		var subcategoryCharges []float64
		var createdAtStr, updatedAtStr string

		err := rows.Scan(
			&product.ID,
			&product.Title,
			&product.Description,
			&product.OriginalPrice,
			&product.DiscountedPrice,
			&product.IsActive,
			&product.CategoryID,
			&createdAtStr,
			&updatedAtStr,
			&category.ID,
			&category.Name,
			pq.Array(&imageIDs),
			pq.Array(&imageURLs),
			pq.Array(&sizeIDs),
			pq.Array(&sizes),
			pq.Array(&sizeCharges),
			pq.Array(&subcategoryIDs),
			pq.Array(&subcategories),
			pq.Array(&subcategoryCharges),
		)
		if err != nil {
			return nil, err
		}

		// Parse the timestamps
		product.CreatedAt, err = time.Parse("2006-01-02T15:04:05Z07:00", createdAtStr)
		if err != nil {
			return nil, err
		}

		product.UpdatedAt, err = time.Parse("2006-01-02T15:04:05Z07:00", updatedAtStr)
		if err != nil {
			return nil, err
		}

		// Assign images (check lengths)
		if len(imageIDs) == len(imageURLs) {
			for i := range imageIDs {
				product.Images = append(product.Images, models.ProductImage{
					ID:        imageIDs[i],
					ProductID: product.ID,
					ImageURL:  imageURLs[i],
				})
			}
		}

		// Assign sizes (check lengths)
		if len(sizeIDs) == len(sizes) && len(sizeIDs) == len(sizeCharges) {
			for i := range sizeIDs {
				product.Sizes = append(product.Sizes, models.ProductSize{
					ID:     sizeIDs[i],
					Size:   sizes[i],
					Charge: sizeCharges[i],
				})
			}
		}

		// Assign subcategories (check lengths)
		if len(subcategoryIDs) == len(subcategories) && len(subcategoryIDs) == len(subcategoryCharges) {
			for i := range subcategoryIDs {
				product.SubCategory = append(product.SubCategory, models.ProductSubCategory{
					ID:          subcategoryIDs[i],
					ProductID:   product.ID,
					Subcategory: subcategories[i],
					Charge:      subcategoryCharges[i],
				})
			}
		}

		// Assign category
		product.Category = category

		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}
func (q *ProductQueries) GetProduct(id uuid.UUID) (models.AllProduct, error) {
	// Define product variable.
	product := models.AllProduct{}

	// Define query string.
	query := `
		SELECT
			p.id AS product_id,
			p.title,
			p.description,
			p.original_price,
			p.discounted_price,
			p.is_active,
			p.category_id,
			to_char(p.created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS created_at,
			to_char(p.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS updated_at,
			c.id AS category_id,
			c.name AS category_name,
			array_agg(DISTINCT pi.id) FILTER (WHERE pi.id IS NOT NULL) AS image_ids,
			array_agg(DISTINCT pi.image_url) FILTER (WHERE pi.id IS NOT NULL) AS image_urls,
			array_agg(DISTINCT ps.id) FILTER (WHERE ps.id IS NOT NULL) AS size_ids,
			array_agg(DISTINCT COALESCE(ps.size, '')) AS sizes,
			array_agg(DISTINCT COALESCE(ps.charge, 0)) AS size_charges,
			array_agg(DISTINCT sc.id) FILTER (WHERE sc.id IS NOT NULL) AS subcategory_ids,
			array_agg(DISTINCT COALESCE(sc.subcategory, '')) AS subcategories,
			array_agg(DISTINCT COALESCE(sc.charge, 0)) AS subcategory_charges
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
			p.id = $1
		GROUP BY
			p.id, c.id;
	`

	// Send query to database.
	row := q.DB.QueryRowx(query, id)

	var category models.ProductCategory
	var imageIDs []uuid.UUID
	var imageURLs []string
	var sizeIDs []uuid.UUID
	var sizes []string
	var sizeCharges []float64
	var subcategoryIDs []uuid.UUID
	var subcategories []string
	var subcategoryCharges []float64
	var createdAtStr, updatedAtStr string

	// Scan the result.
	err := row.Scan(
		&product.ID,
		&product.Title,
		&product.Description,
		&product.OriginalPrice,
		&product.DiscountedPrice,
		&product.IsActive,
		&product.CategoryID,
		&createdAtStr,
		&updatedAtStr,
		&category.ID,
		&category.Name,
		pq.Array(&imageIDs),
		pq.Array(&imageURLs),
		pq.Array(&sizeIDs),
		pq.Array(&sizes),
		pq.Array(&sizeCharges),
		pq.Array(&subcategoryIDs),
		pq.Array(&subcategories),
		pq.Array(&subcategoryCharges),
	)
	if err != nil {
		return product, err
	}

	// Parse the timestamps.
	product.CreatedAt, err = time.Parse("2006-01-02T15:04:05Z07:00", createdAtStr)
	if err != nil {
		return product, err
	}

	product.UpdatedAt, err = time.Parse("2006-01-02T15:04:05Z07:00", updatedAtStr)
	if err != nil {
		return product, err
	}

	// Assign images (check lengths).
	if len(imageIDs) == len(imageURLs) {
		for i := range imageIDs {
			product.Images = append(product.Images, models.ProductImage{
				ID:        imageIDs[i],
				ProductID: product.ID,
				ImageURL:  imageURLs[i],
			})
		}
	}

	// Assign sizes (check lengths).
	if len(sizeIDs) == len(sizes) && len(sizeIDs) == len(sizeCharges) {
		for i := range sizeIDs {
			product.Sizes = append(product.Sizes, models.ProductSize{
				ID:     sizeIDs[i],
				Size:   sizes[i],
				Charge: sizeCharges[i],
			})
		}
	}

	// Assign subcategories (check lengths).
	if len(subcategoryIDs) == len(subcategories) && len(subcategoryIDs) == len(subcategoryCharges) {
		for i := range subcategoryIDs {
			product.SubCategory = append(product.SubCategory, models.ProductSubCategory{
				ID:          subcategoryIDs[i],
				ProductID:   product.ID,
				Subcategory: subcategories[i],
				Charge:      subcategoryCharges[i],
			})
		}
	}

	// Assign category.
	product.Category = category

	return product, nil
}
func (q *ProductQueries) GetTopProductsByCategory() ([]models.CategoryWithProducts, error) {
	query := `
		WITH RankedProducts AS (
    SELECT
        p.id AS product_id,
        p.title,
        p.description,
        p.original_price,
        p.discounted_price,
        p.is_active,
        p.category_id AS product_category_id,
        to_char(p.created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS created_at,
        to_char(p.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS updated_at,
        c.id AS category_id,
        c.name AS category_name,
        ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY p.created_at DESC) AS rank
    FROM
        products p
    JOIN
        categories c ON p.category_id = c.id
)
SELECT
    rp.category_name,
    rp.product_id,
    rp.title,
    rp.description,
    rp.original_price,
    rp.discounted_price,
    rp.is_active,
    rp.product_category_id,
    rp.created_at,
    rp.updated_at,
    array_agg(DISTINCT pi.id) FILTER (WHERE pi.id IS NOT NULL) AS image_ids,
    array_agg(DISTINCT pi.image_url) FILTER (WHERE pi.id IS NOT NULL) AS image_urls,
    array_agg(DISTINCT ps.id) FILTER (WHERE ps.id IS NOT NULL) AS size_ids,
    array_agg(DISTINCT COALESCE(ps.size, '')) AS sizes,
    array_agg(DISTINCT COALESCE(ps.charge, 0)) AS size_charges,
    array_agg(DISTINCT sc.id) FILTER (WHERE sc.id IS NOT NULL) AS subcategory_ids,
    array_agg(DISTINCT COALESCE(sc.subcategory, '')) AS subcategories,
    array_agg(DISTINCT COALESCE(sc.charge, 0)) AS subcategory_charges
FROM
    RankedProducts rp
LEFT JOIN
    product_images pi ON rp.product_id = pi.product_id
LEFT JOIN
    products_size ps ON rp.product_id = ps.product_id
LEFT JOIN
    products_subcategory sc ON rp.product_id = sc.product_id
WHERE
    rp.rank <= 5
GROUP BY
    rp.category_name, rp.product_id, rp.title, rp.description, rp.original_price,
    rp.discounted_price, rp.is_active, rp.product_category_id,
    rp.created_at, rp.updated_at, rp.rank
ORDER BY
    rp.category_name, rp.rank;
	`

	rows, err := q.DB.Queryx(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Map to hold categories and their products
	categoryMap := make(map[string][]models.AllProduct)

	for rows.Next() {
		var product models.AllProduct
		var imageIDs []uuid.UUID
		var imageURLs []string
		var sizeIDs []uuid.UUID
		var sizes []string
		var sizeCharges []float64
		var subcategoryIDs []uuid.UUID
		var subcategories []string
		var subcategoryCharges []float64
		var categoryName string
		var createdAtStr, updatedAtStr string

		err := rows.Scan(
			&categoryName,
			&product.ID,
			&product.Title,
			&product.Description,
			&product.OriginalPrice,
			&product.DiscountedPrice,
			&product.IsActive,
			&product.CategoryID,
			&createdAtStr,
			&updatedAtStr,
			pq.Array(&imageIDs),
			pq.Array(&imageURLs),
			pq.Array(&sizeIDs),
			pq.Array(&sizes),
			pq.Array(&sizeCharges),
			pq.Array(&subcategoryIDs),
			pq.Array(&subcategories),
			pq.Array(&subcategoryCharges),
		)
		if err != nil {
			return nil, err
		}

		// Parse the timestamps
		product.CreatedAt, err = time.Parse("2006-01-02T15:04:05Z07:00", createdAtStr)
		if err != nil {
			return nil, err
		}

		product.UpdatedAt, err = time.Parse("2006-01-02T15:04:05Z07:00", updatedAtStr)
		if err != nil {
			return nil, err
		}

		// Assign images (check lengths)
		if len(imageIDs) == len(imageURLs) {
			for i := range imageIDs {
				product.Images = append(product.Images, models.ProductImage{
					ID:        imageIDs[i],
					ProductID: product.ID,
					ImageURL:  imageURLs[i],
				})
			}
		}

		// Assign sizes (check lengths)
		if len(sizeIDs) == len(sizes) && len(sizeIDs) == len(sizeCharges) {
			for i := range sizeIDs {
				product.Sizes = append(product.Sizes, models.ProductSize{
					ID:     sizeIDs[i],
					Size:   sizes[i],
					Charge: sizeCharges[i],
				})
			}
		}

		// Assign subcategories (check lengths)
		if len(subcategoryIDs) == len(subcategories) && len(subcategoryIDs) == len(subcategoryCharges) {
			for i := range subcategoryIDs {
				product.SubCategory = append(product.SubCategory, models.ProductSubCategory{
					ID:          subcategoryIDs[i],
					ProductID:   product.ID,
					Subcategory: subcategories[i],
					Charge:      subcategoryCharges[i],
				})
			}
		}

		// Group products by category
		categoryMap[categoryName] = append(categoryMap[categoryName], product)
	}

	// Convert map to slice
	var categoriesWithProducts []models.CategoryWithProducts
	for categoryName, products := range categoryMap {
		categoriesWithProducts = append(categoriesWithProducts, models.CategoryWithProducts{
			CategoryName: categoryName,
			Products:     products,
		})
	}

	return categoriesWithProducts, nil
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
