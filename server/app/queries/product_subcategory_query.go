package queries

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

type ProductSubCategoryQuery struct {
	*sqlx.DB
}

func (q *ProductSubCategoryQuery) CreateSubcategory(subcat models.ProductSubCategory) error {
	query := `INSERT INTO products_subcategory (id,product_id,subcategory,charge)VALUES ($1,$2,$3,$4) RETURNING id`
	_, err := q.Exec(query, subcat.ID, subcat.ProductID, subcat.Subcategory, subcat.Charge)
	if err != nil {
		fmt.Println("Create product_subcategory error", err)
		return err
	}
	return nil
}
func (q *ProductSubCategoryQuery) GetSubcategoryById(id uuid.UUID) (models.ProductSubCategory, error) {
	var productSubCategory models.ProductSubCategory
	query := `SELECT * FROM products_subcategory WHERE id = $1`
	err := q.Get(&productSubCategory, query, id)
	if err != nil {
		fmt.Println("Get product_subcategory error", err)
		return models.ProductSubCategory{}, err
	}
	return productSubCategory, nil
}
func (q *ProductSubCategoryQuery) GetSubcategoryByProductId(id uuid.UUID) (models.ProductSubCategory, error) {
	var productSubCategory models.ProductSubCategory
	query := `SELECT * FROM products_subcategory WHERE product_id = $1`
	err := q.Get(&productSubCategory, query, id)
	if err != nil {
		fmt.Println("Get product_subcategory error", err)
		return models.ProductSubCategory{}, err
	}
	return productSubCategory, nil

}
func (q *ProductSubCategoryQuery) DeleteSubcategoryById(id uuid.UUID) error {
	query := `DELETE FROM products_subcategory WHERE id = $1`
	_, err := q.Exec(query, id)
	if err != nil {
		fmt.Println("Delete product_subcategory error", err)
		return err
	}
	return nil

}
