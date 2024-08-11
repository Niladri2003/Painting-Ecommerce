package queries

import (
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
	query := `INSERT INTO order_items (id, order_id, product_id, quantity,price,status,created_at) VALUES ($1, $2, $3, $4,$5,$6)`

	// Send query to database.
	_, err := q.Exec(query, order.ID, order.OrderID, order.ProductID, order.Quantity, order.Price, order.Status, order.CreatedAt)
	if err != nil {
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
