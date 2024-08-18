package queries

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

type OrderItemsQuery struct {
	*sqlx.DB
}

// 1-> create OrderItem
// 2-> Cancel OrderItem
// 3-> GetAllOrderItems

// create OrderItem
func (q *OrderItemsQuery) CreateOrderItem(order *models.OrderItem) error {
	query := `INSERT INTO order_items (id, order_id, product_id,product_name,size, subcategory,quantity,quantity_price,price,status,created_at,updated_at) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12)`

	// Send query to database.
	_, err := q.Exec(query, order.ID, order.OrderID, order.ProductID, order.ProductName, order.Size, order.Subcategory, order.Quantity, order.QuantityPrice, order.Price, order.Status, order.CreatedAt, order.UpdatedAt)
	if err != nil {
		fmt.Println("Error while creating order ITem", err)
		return err
	}

	return nil
}

// Cancel OrderItem
func (q *OrderQueries) CancelOrderItem(order *models.OrderItem) error {
	query := `UPDATE  order_items
				SET status = $1, updated_at = NOW()
				WHERE id = $2`
	_, err := q.Exec(query, order.Status, order.ID)
	if err != nil {
		return err
	}
	return nil
}

// GetAllOrderItems
func (q *OrderQueries) GetAllOrderItemsByOrderId(order_ID uuid.UUID) (models.OrderItem, error) {
	var orderItems models.OrderItem

	query := `SELECT * FROM order_items WHERE order_id = $1`
	err := q.Select(orderItems, query, order_ID)
	if err != nil {
		return orderItems, err
	}
	return orderItems, err

}
