package queries

import (
	"database/sql"
	"fmt"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"time"
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
			id, user_id, total,coupon_code, status, address_id, invoice_url, created_at, updated_at
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8,$9
		)
	`

	// Send query to database
	_, err := q.Exec(query, order.ID, order.UserID, order.Total, order.CouponCode, order.Status, order.AddressID, order.InvoiceUrl, order.CreatedAt, order.UpdatedAt)
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

// Payment Failed
func (q *OrderQueries) PaymentFailedOrder(id uuid.UUID) error {
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
		SET status = 'payment_failed', updated_at = CURRENT_TIMESTAMP 
		WHERE order_id = $1
	`
	_, err = tx.Exec(updateOrderItemsQuery, id)
	if err != nil {
		return err
	}

	// Update the status of the order to 'canceled'
	updateOrderQuery := `
		UPDATE orders 
		SET status = 'payment_failed', updated_at = CURRENT_TIMESTAMP 
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
			o.coupon_code,
			o.status AS order_status,
			o.invoice_url,
			o.created_at AS order_created_at,
			o.updated_at AS order_updated_at,
			oi.id AS order_item_id,
			oi.product_id,
			COALESCE(oi.product_name, '') AS product_name, -- Handle NULL values for product_name
			COALESCE(oi.size, '') AS size,                -- Handle NULL values for size
			COALESCE(oi.subcategory, '') AS subcategory,  -- Handle NULL values for subcategory
			COALESCE(oi.quantity, 0) AS quantity,         -- Handle NULL values for quantity
			COALESCE(oi.quantity_price, 0.0) AS quantity_price, -- Handle NULL values for quantity_price
			COALESCE(oi.price, 0.0) AS price,             -- Handle NULL values for price
			COALESCE(oi.status, '') AS order_item_status, -- Handle NULL values for status
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
			addresses a ON o.address_id = a.id AND a.set_as_default = true
		WHERE 
			o.user_id = $1
		ORDER BY 
			o.created_at DESC, o.id ASC
	`

	// Execute the query
	rows, err := q.DB.Query(query, userID)
	if err != nil {
		return nil, fmt.Errorf("error querying database for orders by userID %s: %w", userID, err)
	}
	defer func() {
		if closeErr := rows.Close(); closeErr != nil {
			fmt.Println("Error closing rows:", closeErr)
		}
	}()

	// Initialize a map to group orders and their items
	orderMap := make(map[uuid.UUID]*models.OrderWithItems)

	// Iterate over the rows and populate the order map
	for rows.Next() {
		var orderWithItems models.OrderWithItems
		var orderItem models.OrderItem
		var address models.Address
		var orderItemQuantity sql.NullInt64
		var orderItemPrice sql.NullFloat64
		var orderItemQuantityPrice sql.NullFloat64
		var orderItemStatus sql.NullString
		var orderItemCreatedAt sql.NullTime
		var addressID sql.NullString
		var couponCode sql.NullString

		err := rows.Scan(
			&orderWithItems.OrderID,
			&orderWithItems.UserID,
			&orderWithItems.Total,
			&couponCode, // Handle NULLs for coupon_code
			&orderWithItems.OrderStatus,
			&orderWithItems.InvoiceURL,
			&orderWithItems.OrderCreatedAt,
			&orderWithItems.OrderUpdatedAt,
			&orderItem.ID,
			&orderItem.ProductID,
			&orderItem.ProductName,
			&orderItem.Size,         // Handle NULLs for size
			&orderItem.Subcategory,  // Handle NULLs for subcategory
			&orderItemQuantity,      // Handle NULLs for quantity
			&orderItemQuantityPrice, // Handle NULLs for quantity_price
			&orderItemPrice,         // Handle NULLs for price
			&orderItemStatus,        // Handle NULLs for status
			&orderItemCreatedAt,     // Handle NULLs for created_at
			&addressID,              // Check if address is present
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
			return nil, fmt.Errorf("error scanning row into structs: %w", err)
		}

		// Add order to the map if not already present
		if _, exists := orderMap[orderWithItems.OrderID]; !exists {
			orderMap[orderWithItems.OrderID] = &models.OrderWithItems{
				OrderID:        orderWithItems.OrderID,
				UserID:         orderWithItems.UserID,
				Total:          orderWithItems.Total,
				CouponCode:     "", // Default empty value
				OrderStatus:    orderWithItems.OrderStatus,
				InvoiceURL:     orderWithItems.InvoiceURL,
				OrderCreatedAt: orderWithItems.OrderCreatedAt,
				OrderUpdatedAt: orderWithItems.OrderUpdatedAt,
				Address:        []models.Address{address}, // Set address details
				OrderItems:     []models.OrderItem{},      // Initialize order items slice
			}
		}

		// Assign the coupon code, handling NULLs
		if couponCode.Valid {
			orderMap[orderWithItems.OrderID].CouponCode = couponCode.String
		}

		// Assign the quantity, handling NULLs
		if orderItemQuantity.Valid {
			orderItem.Quantity = int(orderItemQuantity.Int64)
		} else {
			orderItem.Quantity = 0 // Default value for NULLs
		}

		// Assign the quantity_price, handling NULLs
		if orderItemQuantityPrice.Valid {
			orderItem.QuantityPrice = orderItemQuantityPrice.Float64
		} else {
			orderItem.QuantityPrice = 0.0 // Default value for NULLs
		}

		// Assign the price, handling NULLs
		if orderItemPrice.Valid {
			orderItem.Price = orderItemPrice.Float64
		} else {
			orderItem.Price = 0.0 // Default value for NULLs
		}

		// Assign the status, handling NULLs
		if orderItemStatus.Valid {
			orderItem.Status = orderItemStatus.String
		} else {
			orderItem.Status = "" // Default value for NULLs
		}

		// Assign the created_at, handling NULLs
		if orderItemCreatedAt.Valid {
			orderItem.CreatedAt = orderItemCreatedAt.Time
		} else {
			orderItem.CreatedAt = time.Time{} // Default value for NULLs
		}

		// Add the order item to the corresponding order
		if orderItem.ID != uuid.Nil {
			orderMap[orderWithItems.OrderID].OrderItems = append(orderMap[orderWithItems.OrderID].OrderItems, orderItem)
		}

		// Add the address to the order if it's not already present and if the address exists
		// if addressID.Valid {
		// 	address.ID = uuid.MustParse(addressID.String)
		// 	orderMap[orderWithItems.OrderID].Address = append(orderMap[orderWithItems.OrderID].Address, address)
		// }
	}

	// Check for errors after iterating over rows
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	// Convert the map to a slice
	var orders []models.OrderWithItems
	for _, order := range orderMap {
		orders = append(orders, *order)
	}

	return orders, nil
}

/*
func (q *OrderQueries) GetOrders() ([]models.OrderWithItems, error) {
	// Define the SQL query
	query := `
		SELECT
			o.id AS order_id,
			o.user_id,
			o.total,
			o.coupon_code,
			o.status AS order_status,
			o.invoice_url,
			o.created_at AS order_created_at,
			o.updated_at AS order_updated_at,
			oi.id AS order_item_id,
			oi.product_id,
			COALESCE(oi.product_name, '') AS product_name, -- Handle NULL values for product_name
			COALESCE(oi.size, '') AS size,                -- Handle NULL values for size
			COALESCE(oi.subcategory, '') AS subcategory,  -- Handle NULL values for subcategory
			COALESCE(oi.quantity, 0) AS quantity,         -- Handle NULL values for quantity
			COALESCE(oi.quantity_price, 0.0) AS quantity_price, -- Handle NULL values for quantity_price
			COALESCE(oi.price, 0.0) AS price,             -- Handle NULL values for price
			COALESCE(oi.status, '') AS order_item_status, -- Handle NULL values for status
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
		ORDER BY
			o.created_at DESC, o.id ASC
	`

	// Execute the query
	rows, err := q.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error querying database for orders by userID %s: %w", err)
	}
	defer func() {
		if closeErr := rows.Close(); closeErr != nil {
			fmt.Println("Error closing rows:", closeErr)
		}
	}()

	// Initialize a map to group orders and their items
	orderMap := make(map[uuid.UUID]*models.OrderWithItems)

	// Iterate over the rows and populate the order map
	for rows.Next() {
		var orderWithItems models.OrderWithItems
		var orderItem models.OrderItem
		var address models.Address
		var orderItemQuantity sql.NullInt64
		var orderItemPrice sql.NullFloat64
		var orderItemQuantityPrice sql.NullFloat64
		var orderItemStatus sql.NullString
		var orderItemCreatedAt sql.NullTime
		var addressID sql.NullString
		var couponCode sql.NullString

		err := rows.Scan(
			&orderWithItems.OrderID,
			&orderWithItems.UserID,
			&orderWithItems.Total,
			&couponCode, // Handle NULLs for coupon_code
			&orderWithItems.OrderStatus,
			&orderWithItems.InvoiceURL,
			&orderWithItems.OrderCreatedAt,
			&orderWithItems.OrderUpdatedAt,
			&orderItem.ID,
			&orderItem.ProductID,
			&orderItem.ProductName,
			&orderItem.Size,         // Handle NULLs for size
			&orderItem.Subcategory,  // Handle NULLs for subcategory
			&orderItemQuantity,      // Handle NULLs for quantity
			&orderItemQuantityPrice, // Handle NULLs for quantity_price
			&orderItemPrice,         // Handle NULLs for price
			&orderItemStatus,        // Handle NULLs for status
			&orderItemCreatedAt,     // Handle NULLs for created_at
			&addressID,              // Check if address is present
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
			return nil, fmt.Errorf("error scanning row into structs: %w", err)
		}

		// Add order to the map if not already present
		if _, exists := orderMap[orderWithItems.OrderID]; !exists {
			orderMap[orderWithItems.OrderID] = &models.OrderWithItems{
				OrderID:        orderWithItems.OrderID,
				UserID:         orderWithItems.UserID,
				Total:          orderWithItems.Total,
				CouponCode:     "", // Default empty value
				OrderStatus:    orderWithItems.OrderStatus,
				InvoiceURL:     orderWithItems.InvoiceURL,
				OrderCreatedAt: orderWithItems.OrderCreatedAt,
				OrderUpdatedAt: orderWithItems.OrderUpdatedAt,
				Address:        []models.Address{},   // Set address details
				OrderItems:     []models.OrderItem{}, // Initialize order items slice
			}
		}

		// Assign the coupon code, handling NULLs
		if couponCode.Valid {
			orderMap[orderWithItems.OrderID].CouponCode = couponCode.String
		}

		// Assign the quantity, handling NULLs
		if orderItemQuantity.Valid {
			orderItem.Quantity = int(orderItemQuantity.Int64)
		} else {
			orderItem.Quantity = 0 // Default value for NULLs
		}

		// Assign the quantity_price, handling NULLs
		if orderItemQuantityPrice.Valid {
			orderItem.QuantityPrice = orderItemQuantityPrice.Float64
		} else {
			orderItem.QuantityPrice = 0.0 // Default value for NULLs
		}

		// Assign the price, handling NULLs
		if orderItemPrice.Valid {
			orderItem.Price = orderItemPrice.Float64
		} else {
			orderItem.Price = 0.0 // Default value for NULLs
		}

		// Assign the status, handling NULLs
		if orderItemStatus.Valid {
			orderItem.Status = orderItemStatus.String
		} else {
			orderItem.Status = "" // Default value for NULLs
		}

		// Assign the created_at, handling NULLs
		if orderItemCreatedAt.Valid {
			orderItem.CreatedAt = orderItemCreatedAt.Time
		} else {
			orderItem.CreatedAt = time.Time{} // Default value for NULLs
		}

		// Add the order item to the corresponding order
		if orderItem.ID != uuid.Nil {
			orderMap[orderWithItems.OrderID].OrderItems = append(orderMap[orderWithItems.OrderID].OrderItems, orderItem)
		}

		// Only add the address if it's not already in the order's address slice
		addressAlreadyAdded := false
		for _, addr := range orderMap[orderWithItems.OrderID].Address {
			if addr.ID == address.ID {
				addressAlreadyAdded = true
				break
			}
		}

		if !addressAlreadyAdded && addressID.Valid {
			address.ID = uuid.MustParse(addressID.String)
			orderMap[orderWithItems.OrderID].Address = append(orderMap[orderWithItems.OrderID].Address, address)
		}
	}

	// Check for errors after iterating over rows
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	// Convert the map to a slice
	var orders []models.OrderWithItems
	for _, order := range orderMap {
		orders = append(orders, *order)
	}

	return orders, nil
}
*/

/*

func (q *OrderQueries) GetAllOrders() ([]models.OrderWithItems, error) {
	// Define the SQL query
	query := `
		SELECT 
			o.id AS order_id,
			o.user_id,
			o.total,
			o.coupon_code,
			o.status AS order_status,
			o.invoice_url,
			o.created_at AS order_created_at,
			o.updated_at AS order_updated_at,
			oi.id AS order_item_id,
			oi.product_id,
			COALESCE(oi.product_name, '') AS product_name, -- Handle NULL values for product_name
			COALESCE(oi.size, '') AS size,                -- Handle NULL values for size
			COALESCE(oi.subcategory, '') AS subcategory,  -- Handle NULL values for subcategory
			COALESCE(oi.quantity, 0) AS quantity,         -- Handle NULL values for quantity
			COALESCE(oi.quantity_price, 0.0) AS quantity_price, -- Handle NULL values for quantity_price
			COALESCE(oi.price, 0.0) AS price,             -- Handle NULL values for price
			COALESCE(oi.status, '') AS order_item_status, -- Handle NULL values for status
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
			addresses a ON o.address_id = a.id AND a.set_as_default = true
		ORDER BY 
			o.created_at DESC, o.id ASC
	`

	// Execute the query
	rows, err := q.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error querying database for all orders: %w", err)
	}
	defer func() {
		if closeErr := rows.Close(); closeErr != nil {
			fmt.Println("Error closing rows:", closeErr)
		}
	}()

	// Initialize a map to group orders and their items
	orderMap := make(map[uuid.UUID]*models.OrderWithItems)

	// Iterate over the rows and populate the order map
	for rows.Next() {
		var orderWithItems models.OrderWithItems
		var orderItem models.OrderItem
		var address models.Address
		var orderItemQuantity sql.NullInt64
		var orderItemPrice sql.NullFloat64
		var orderItemQuantityPrice sql.NullFloat64
		var orderItemStatus sql.NullString
		var orderItemCreatedAt sql.NullTime
		var addressID sql.NullString
		var couponCode sql.NullString

		err := rows.Scan(
			&orderWithItems.OrderID,
			&orderWithItems.UserID,
			&orderWithItems.Total,
			&couponCode, // Handle NULLs for coupon_code
			&orderWithItems.OrderStatus,
			&orderWithItems.InvoiceURL,
			&orderWithItems.OrderCreatedAt,
			&orderWithItems.OrderUpdatedAt,
			&orderItem.ID,
			&orderItem.ProductID,
			&orderItem.ProductName,
			&orderItem.Size,         // Handle NULLs for size
			&orderItem.Subcategory,  // Handle NULLs for subcategory
			&orderItemQuantity,      // Handle NULLs for quantity
			&orderItemQuantityPrice, // Handle NULLs for quantity_price
			&orderItemPrice,         // Handle NULLs for price
			&orderItemStatus,        // Handle NULLs for status
			&orderItemCreatedAt,     // Handle NULLs for created_at
			&addressID,              // Check if address is present
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
			return nil, fmt.Errorf("error scanning row into structs: %w", err)
		}

		// Add order to the map if not already present
		if _, exists := orderMap[orderWithItems.OrderID]; !exists {
			orderMap[orderWithItems.OrderID] = &models.OrderWithItems{
				OrderID:        orderWithItems.OrderID,
				UserID:         orderWithItems.UserID,
				Total:          orderWithItems.Total,
				CouponCode:     "", // Default empty value
				OrderStatus:    orderWithItems.OrderStatus,
				InvoiceURL:     orderWithItems.InvoiceURL,
				OrderCreatedAt: orderWithItems.OrderCreatedAt,
				OrderUpdatedAt: orderWithItems.OrderUpdatedAt,
				Address:        []models.Address{address}, // Set address details
				OrderItems:     []models.OrderItem{},      // Initialize order items slice
			}
		}

		// Assign the coupon code, handling NULLs
		if couponCode.Valid {
			orderMap[orderWithItems.OrderID].CouponCode = couponCode.String
		}

		// Assign the quantity, handling NULLs
		if orderItemQuantity.Valid {
			orderItem.Quantity = int(orderItemQuantity.Int64)
		} else {
			orderItem.Quantity = 0 // Default value for NULLs
		}

		// Assign the quantity_price, handling NULLs
		if orderItemQuantityPrice.Valid {
			orderItem.QuantityPrice = orderItemQuantityPrice.Float64
		} else {
			orderItem.QuantityPrice = 0.0 // Default value for NULLs
		}

		// Assign the price, handling NULLs
		if orderItemPrice.Valid {
			orderItem.Price = orderItemPrice.Float64
		} else {
			orderItem.Price = 0.0 // Default value for NULLs
		}

		// Assign the status, handling NULLs
		if orderItemStatus.Valid {
			orderItem.Status = orderItemStatus.String
		} else {
			orderItem.Status = "" // Default value for NULLs
		}

		// Assign the created_at, handling NULLs
		if orderItemCreatedAt.Valid {
			orderItem.CreatedAt = orderItemCreatedAt.Time
		} else {
			orderItem.CreatedAt = time.Time{} // Default value for NULLs
		}

		// Add the order item to the corresponding order
		if orderItem.ID != uuid.Nil {
			orderMap[orderWithItems.OrderID].OrderItems = append(orderMap[orderWithItems.OrderID].OrderItems, orderItem)
		}

		// Add the address to the order if it's not already present and if the address exists
		// if addressID.Valid {
		// 	address.ID = uuid.MustParse(addressID.String)
		// 	orderMap[orderWithItems.OrderID].Address = append(orderMap[orderWithItems.OrderID].Address, address)
		// }
	}

	// Check for errors after iterating over rows
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	// Convert the map to a slice
	var orders []models.OrderWithItems
	for _, order := range orderMap {
		orders = append(orders, *order)
	}

	return orders, nil
}

*/

func (q *OrderQueries) GetAllOrders() ([]models.OrderWithItems, error) {
	// Define the SQL query
	query := `
		SELECT 
			o.id AS order_id,
			o.user_id,
			o.total,
			o.coupon_code,
			o.status AS order_status,
			o.invoice_url,
			o.created_at AS order_created_at,
			o.updated_at AS order_updated_at,
			oi.id AS order_item_id,
			oi.product_id,
			COALESCE(oi.product_name, '') AS product_name, -- Handle NULL values for product_name
			COALESCE(oi.size, '') AS size,                -- Handle NULL values for size
			COALESCE(oi.subcategory, '') AS subcategory,  -- Handle NULL values for subcategory
			COALESCE(oi.quantity, 0) AS quantity,         -- Handle NULL values for quantity
			COALESCE(oi.quantity_price, 0.0) AS quantity_price, -- Handle NULL values for quantity_price
			COALESCE(oi.price, 0.0) AS price,             -- Handle NULL values for price
			COALESCE(oi.status, '') AS order_item_status, -- Handle NULL values for status
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
			addresses a ON o.address_id = a.id AND a.set_as_default = true
		ORDER BY 
			o.created_at DESC, o.id ASC
	`

	// Execute the query
	rows, err := q.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error querying database for all orders: %w", err)
	}
	defer func() {
		if closeErr := rows.Close(); closeErr != nil {
			fmt.Println("Error closing rows:", closeErr)
		}
	}()

	// Initialize a map to group orders and their items
	orderMap := make(map[uuid.UUID]*models.OrderWithItems)

	// Iterate over the rows and populate the order map
	for rows.Next() {
		var orderWithItems models.OrderWithItems
		var orderItem models.OrderItem
		var address models.Address
		var orderItemQuantity sql.NullInt64
		var orderItemPrice sql.NullFloat64
		var orderItemQuantityPrice sql.NullFloat64
		var orderItemStatus sql.NullString
		var orderItemCreatedAt sql.NullTime
		var addressID sql.NullString
		var couponCode sql.NullString
		var firstName sql.NullString
		var lastName sql.NullString
		var country sql.NullString
		var streetAddress sql.NullString
		var townCity sql.NullString
		var state sql.NullString
		var pinCode sql.NullString
		var mobileNumber sql.NullString
		var email sql.NullString
		var orderNotes sql.NullString
		var addressCreatedAt sql.NullTime
		var addressUpdatedAt sql.NullTime

		err := rows.Scan(
			&orderWithItems.OrderID,
			&orderWithItems.UserID,
			&orderWithItems.Total,
			&couponCode, // Handle NULLs for coupon_code
			&orderWithItems.OrderStatus,
			&orderWithItems.InvoiceURL,
			&orderWithItems.OrderCreatedAt,
			&orderWithItems.OrderUpdatedAt,
			&orderItem.ID,
			&orderItem.ProductID,
			&orderItem.ProductName,
			&orderItem.Size,         // Handle NULLs for size
			&orderItem.Subcategory,  // Handle NULLs for subcategory
			&orderItemQuantity,      // Handle NULLs for quantity
			&orderItemQuantityPrice, // Handle NULLs for quantity_price
			&orderItemPrice,         // Handle NULLs for price
			&orderItemStatus,        // Handle NULLs for status
			&orderItemCreatedAt,     // Handle NULLs for created_at
			&addressID,              // Check if address is present
			&address.UserID,
			&firstName,
			&lastName,
			&country,
			&streetAddress,
			&townCity,
			&state,
			&pinCode,
			&mobileNumber,
			&email,
			&orderNotes,
			&addressCreatedAt,
			&addressUpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("error scanning row into structs: %w", err)
		}

		// Assign the nullable fields, handling NULLs
		address.FirstName = firstName.String
		address.LastName = lastName.String
		address.Country = country.String
		address.StreetAddress = streetAddress.String
		address.TownCity = townCity.String
		address.State = state.String
		address.PinCode = pinCode.String
		address.MobileNumber = mobileNumber.String
		address.Email = email.String
		address.OrderNotes = &orderNotes.String

		// Add order to the map if not already present
		if _, exists := orderMap[orderWithItems.OrderID]; !exists {
			orderMap[orderWithItems.OrderID] = &models.OrderWithItems{
				OrderID:        orderWithItems.OrderID,
				UserID:         orderWithItems.UserID,
				Total:          orderWithItems.Total,
				CouponCode:     "", // Default empty value
				OrderStatus:    orderWithItems.OrderStatus,
				InvoiceURL:     orderWithItems.InvoiceURL,
				OrderCreatedAt: orderWithItems.OrderCreatedAt,
				OrderUpdatedAt: orderWithItems.OrderUpdatedAt,
				Address:        []models.Address{address},   // Set address details
				OrderItems:     []models.OrderItem{}, // Initialize order items slice
			}
		}

		// Assign the coupon code, handling NULLs
		if couponCode.Valid {
			orderMap[orderWithItems.OrderID].CouponCode = couponCode.String
		}

		// Assign the quantity, handling NULLs
		if orderItemQuantity.Valid {
			orderItem.Quantity = int(orderItemQuantity.Int64)
		} else {
			orderItem.Quantity = 0 // Default value for NULLs
		}

		// Assign the quantity_price, handling NULLs
		if orderItemQuantityPrice.Valid {
			orderItem.QuantityPrice = orderItemQuantityPrice.Float64
		} else {
			orderItem.QuantityPrice = 0.0 // Default value for NULLs
		}

		// Assign the price, handling NULLs
		if orderItemPrice.Valid {
			orderItem.Price = orderItemPrice.Float64
		} else {
			orderItem.Price = 0.0 // Default value for NULLs
		}

		// Assign the status, handling NULLs
		if orderItemStatus.Valid {
			orderItem.Status = orderItemStatus.String
		} else {
			orderItem.Status = "" // Default value for NULLs
		}

		// Assign the created_at, handling NULLs
		if orderItemCreatedAt.Valid {
			orderItem.CreatedAt = orderItemCreatedAt.Time
		} else {
			orderItem.CreatedAt = time.Time{} // Default value for NULLs
		}

		// Add the order item to the corresponding order
		if orderItem.ID != uuid.Nil {
			orderMap[orderWithItems.OrderID].OrderItems = append(orderMap[orderWithItems.OrderID].OrderItems, orderItem)
		}

		if addressCreatedAt.Valid{
			address.CreatedAt = addressCreatedAt.Time.String()
		} else {
			address.CreatedAt = time.Time{}.String()
		}

		// Add the address to the order if it's not already present and if the address exists
		// if addressID.Valid {
		// 	address.ID = uuid.MustParse(addressID.String)
		// 	orderMap[orderWithItems.OrderID].Address = append(orderMap[orderWithItems.OrderID].Address, address)
		// }

	

		
	}

	// Check for errors after iterating over rows
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	// Convert the map to a slice
	var orders []models.OrderWithItems
	for _, order := range orderMap {
		orders = append(orders, *order)
	}

	return orders, nil
}

