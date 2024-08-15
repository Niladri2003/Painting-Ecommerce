package queries

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

type ProductSizeQuery struct {
	*sqlx.DB
}

// create product size
func (q *ProductSizeQuery) CreateProductSize(size models.ProductSize) error {

	query := `INSERT INTO products_size (id,product_id,size,charge)VALUES ($1,$2,$3,$4) RETURNING id`
	_, err := q.Exec(query, size.ID, size.ProductID, size.Size, size.Charge)
	if err != nil {
		fmt.Println("Create product size error", err)
		return err
	}
	return nil
}

// get product size
func (q *ProductSizeQuery) GetProductSizeId(id uuid.UUID) (models.ProductSize, error) {
	var size models.ProductSize
	query := `SELECT * FROM products_size WHERE id=$1`
	err := q.Get(&size, query, id)
	if err != nil {
		fmt.Println("Get product size error", err)
		return models.ProductSize{}, err
	}
	return size, nil

}

func (q *ProductSizeQuery) GetProductSizeByProductId(id uuid.UUID) (models.ProductSize, error) {
	query := `SELECT * FROM products_size WHERE product_id = $1`
	var size models.ProductSize
	err := q.Get(&size, query, id)
	if err != nil {
		fmt.Println("Get product size error", err)
		return models.ProductSize{}, err
	}
	return size, nil
}

// delete product size
func (q *ProductSizeQuery) DeleteProductSizeById(id uuid.UUID) error {
	query := `DELETE FROM products_size WHERE id=$1`
	_, err := q.Exec(query, id)
	if err != nil {
		fmt.Println("Delete product size error", err)
		return err
	}
	return nil
}
