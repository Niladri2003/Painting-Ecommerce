package queries

import (
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

type OrderQueries struct {
	*sqlx.DB
}

//All Queries
// 1-> Create Order
// 2-> Cancel Order
// 3-> Get All orders For a Specific user
// 4 ->Get all Orders

// CreateOrder insert new order in order Table from orderItems
func (q *OrderQueries) CreateOrder(order *models.Order) error {
	// Set default status to 'pending' if not provided
	if order.Status == "" {
		order.Status = "pending"
	}

	query := `
		INSERT INTO orders (
			id, user_id, total, status, address_id, invoice_url, created_at, updated_at
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8
		)
	`

	// Send query to database
	_, err := q.Exec(query, order.ID, order.UserID, order.Total, order.Status, order.AddressID, order.InvoiceUrl, order.CreatedAt, order.UpdatedAt)
	if err != nil {
		return err
	}
	return nil
}

// CancelOrder delete order from order table as well as change status to cancel in orderItems table
func (q *OrderQueries) CancelOrder(id uuid.UUID) error {
	// Begin a transaction
	tx, err := q.DB.Begin()
	if err != nil {
		return err
	}

	// Rollback the transaction if there's any error
	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	// Update the status of order items to 'canceled'
	updateOrderItemsQuery := `
		UPDATE order_items 
		SET status = 'canceled', updated_at = CURRENT_TIMESTAMP 
		WHERE order_id = $1
	`
	_, err = tx.Exec(updateOrderItemsQuery, id)
	if err != nil {
		return err
	}

	// Update the status of the order to 'canceled'
	updateOrderQuery := `
		UPDATE orders 
		SET status = 'canceled', updated_at = CURRENT_TIMESTAMP 
		WHERE id = $1
	`
	_, err = tx.Exec(updateOrderQuery, id)
	if err != nil {
		return err
	}

	// Commit the transaction if everything is successful
	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}

// ShippedOrder order from order table as well as change status to shipped in orderItems table
func (q *OrderQueries) ShippedOrder(id uuid.UUID) error {
	// Begin a transaction
	tx, err := q.DB.Begin()
	if err != nil {
		return err
	}

	// Rollback the transaction if there's any error
	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	// Update the status of order items to 'canceled'
	updateOrderItemsQuery := `
		UPDATE order_items 
		SET status = 'shipped', updated_at = CURRENT_TIMESTAMP 
		WHERE order_id = $1
	`
	_, err = tx.Exec(updateOrderItemsQuery, id)
	if err != nil {
		return err
	}

	// Update the status of the order to 'canceled'
	updateOrderQuery := `
		UPDATE orders 
		SET status = 'shipped', updated_at = CURRENT_TIMESTAMP 
		WHERE id = $1
	`
	_, err = tx.Exec(updateOrderQuery, id)
	if err != nil {
		return err
	}

	// Commit the transaction if everything is successful
	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}

// Deliverd order from order table as well as change status to shipped in orderItems table
func (q *OrderQueries) DeliveredOrder(id uuid.UUID) error {
	// Begin a transaction
	tx, err := q.DB.Begin()
	if err != nil {
		return err
	}

	// Rollback the transaction if there's any error
	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	// Update the status of order items to 'canceled'
	updateOrderItemsQuery := `
		UPDATE order_items 
		SET status = 'delivered', updated_at = CURRENT_TIMESTAMP 
		WHERE order_id = $1
	`
	_, err = tx.Exec(updateOrderItemsQuery, id)
	if err != nil {
		return err
	}

	// Update the status of the order to 'canceled'
	updateOrderQuery := `
		UPDATE orders 
		SET status = 'delivered', updated_at = CURRENT_TIMESTAMP 
		WHERE id = $1
	`
	_, err = tx.Exec(updateOrderQuery, id)
	if err != nil {
		return err
	}

	// Commit the transaction if everything is successful
	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}

// Get Order Of a User
func (q *OrderQueries) GetOrdersByUserID(userID uuid.UUID) ([]models.OrderWithItems, error) {
	// Define the SQL query
	query := `
		SELECT 
			o.id AS order_id,
			o.user_id,
			o.total,
			o.status AS order_status,
			o.invoice_url,
			o.created_at AS order_created_at,
			o.updated_at AS order_updated_at,
			oi.id AS order_item_id,
			oi.product_id,
			oi.quantity,
			oi.price,
			oi.status AS order_item_status,
			oi.created_at AS order_item_created_at,
			a.id AS address_id,
			a.user_id AS address_user_id,
			a.first_name,
			a.last_name,
			a.country,
			a.street_address,
			a.town_city,
			a.state,
			a.pin_code,
			a.mobile_number,
			a.email,
			a.order_notes,
			a.created_at AS address_created_at,
			a.updated_at AS address_updated_at
		FROM 
			orders o
		LEFT JOIN 
			order_items oi ON o.id = oi.order_id
		LEFT JOIN 
			addresses a ON o.address_id = a.id
		WHERE 
			o.user_id = $1
		ORDER BY 
			o.created_at DESC, o.id ASC
	`

	// Execute the query
	rows, err := q.DB.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Initialize a map to group orders and their items
	orderMap := make(map[uuid.UUID]*models.OrderWithItems)

	// Iterate over the rows and populate the order map
	for rows.Next() {
		var orderWithItems models.OrderWithItems
		var orderItem models.OrderItem
		var address models.Address
		err := rows.Scan(
			&orderWithItems.OrderID,
			&orderWithItems.UserID,
			&orderWithItems.Total,
			&orderWithItems.OrderStatus,
			&orderWithItems.InvoiceURL,
			&orderWithItems.OrderCreatedAt,
			&orderWithItems.OrderUpdatedAt,
			&orderItem.ID,
			&orderItem.ProductID,
			&orderItem.Quantity,
			&orderItem.Price,
			&orderItem.Status,
			&orderItem.CreatedAt,
			&address.ID,
			&address.UserID,
			&address.FirstName,
			&address.LastName,
			&address.Country,
			&address.StreetAddress,
			&address.TownCity,
			&address.State,
			&address.PinCode,
			&address.MobileNumber,
			&address.Email,
			&address.OrderNotes,
			&address.CreatedAt,
			&address.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		// Add order to the map if not already present
		if _, exists := orderMap[orderWithItems.OrderID]; !exists {
			orderMap[orderWithItems.OrderID] = &models.OrderWithItems{
				OrderID:        orderWithItems.OrderID,
				UserID:         orderWithItems.UserID,
				Total:          orderWithItems.Total,
				OrderStatus:    orderWithItems.OrderStatus,
				InvoiceURL:     orderWithItems.InvoiceURL,
				OrderCreatedAt: orderWithItems.OrderCreatedAt,
				OrderUpdatedAt: orderWithItems.OrderUpdatedAt,
				Address:        []models.Address{},   // Set address details
				OrderItems:     []models.OrderItem{}, // Initialize order items slice
			}
		}

		// Add the order item to the corresponding order
		if orderItem.ID != uuid.Nil {
			orderMap[orderWithItems.OrderID].OrderItems = append(orderMap[orderWithItems.OrderID].OrderItems, orderItem)
		}
	}

	// Convert the map to a slice
	var orders []models.OrderWithItems
	for _, order := range orderMap {
		orders = append(orders, *order)
	}

	// Check for errors from iterating over rows
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return orders, nil
}

// Get All Orders
func (q *OrderQueries) GetOrders() ([]models.OrderWithItems, error) {
	// Define the SQL query with address details
	query := `
		SELECT 
			o.id AS order_id,
			o.user_id,
			o.total,
			o.status AS order_status,
			a.id AS address_id,
			a.first_name AS address_first_name,
			a.last_name AS address_last_name,
			a.country AS address_country,
			a.street_address AS address_street_address,
			a.town_city AS address_town_city,
			a.state AS address_state,
			a.pin_code AS address_pin_code,
			a.mobile_number AS address_mobile_number,
			a.email AS address_email,
			a.order_notes AS address_order_notes,
			o.invoice_url,
			o.created_at AS order_created_at,
			o.updated_at AS order_updated_at,
			oi.id AS order_item_id,
			oi.product_id,
			oi.quantity,
			oi.price,
			oi.status AS order_item_status,
			oi.created_at AS order_item_created_at,
			oi.updated_at AS order_item_updated_at
		FROM 
			orders o
		LEFT JOIN 
			addresses a ON o.address_id = a.id
		LEFT JOIN 
			order_items oi ON o.id = oi.order_id
		ORDER BY 
			o.created_at DESC, o.id ASC;
	`

	// Execute the query
	rows, err := q.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Initialize a map to group orders and their items
	orderMap := make(map[uuid.UUID]*models.OrderWithItems)

	// Iterate over the rows and populate the order map
	for rows.Next() {
		var orderWithItems models.OrderWithItems
		var orderItem models.OrderItem
		var address models.Address
		err := rows.Scan(
			&orderWithItems.OrderID,
			&orderWithItems.UserID,
			&orderWithItems.Total,
			&orderWithItems.OrderStatus,
			&address.ID,
			&address.FirstName,
			&address.LastName,
			&address.Country,
			&address.StreetAddress,
			&address.TownCity,
			&address.State,
			&address.PinCode,
			&address.MobileNumber,
			&address.Email,
			&address.OrderNotes,
			&orderWithItems.InvoiceURL,
			&orderWithItems.OrderCreatedAt,
			&orderWithItems.OrderUpdatedAt,
			&orderItem.ID,
			&orderItem.ProductID,
			&orderItem.Quantity,
			&orderItem.Price,
			&orderItem.Status,
			&orderItem.CreatedAt,
			&orderItem.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		// Add order to the map if not already present
		if _, exists := orderMap[orderWithItems.OrderID]; !exists {
			orderMap[orderWithItems.OrderID] = &models.OrderWithItems{
				OrderID:        orderWithItems.OrderID,
				UserID:         orderWithItems.UserID,
				Total:          orderWithItems.Total,
				OrderStatus:    orderWithItems.OrderStatus,
				InvoiceURL:     orderWithItems.InvoiceURL,
				OrderCreatedAt: orderWithItems.OrderCreatedAt,
				OrderUpdatedAt: orderWithItems.OrderUpdatedAt,
				Address:        []models.Address{},   // Initialize address slice
				OrderItems:     []models.OrderItem{}, // Initialize order items slice
			}
		}

		// Add the address to the corresponding order if present
		if address.ID != uuid.Nil {
			addressExists := false
			for _, addr := range orderMap[orderWithItems.OrderID].Address {
				if addr.ID == address.ID {
					addressExists = true
					break
				}
			}
			if !addressExists {
				orderMap[orderWithItems.OrderID].Address = append(orderMap[orderWithItems.OrderID].Address, address)
			}
		}

		// Add the order item to the corresponding order
		if orderItem.ID != uuid.Nil {
			orderMap[orderWithItems.OrderID].OrderItems = append(orderMap[orderWithItems.OrderID].OrderItems, orderItem)
		}
	}

	// Convert the map to a slice
	var orders []models.OrderWithItems
	for _, order := range orderMap {
		orders = append(orders, *order)
	}

	// Check for errors from iterating over rows
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return orders, nil
}
