package migration

import (
	
	"fmt"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/niladri2003/PaintingEcommerce/pkg/utils"
	"log"
	
)

func RunMigration() {
	postgresConnURL, err := utils.ConnectionURLBuilder("postgres")
	fmt.Printf("Postgres connection URL: %s\n", postgresConnURL)
	if err != nil {
		fmt.Printf("Error: %s\n", err.Error())
	}

	m, err := migrate.New(
		"file://sql",
		postgresConnURL,
	)
	if err != nil {
		log.Fatalf("Error creating migration: %v", err)
	}
	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Fatalf("Error running migration: %v", err)
	}

	log.Println("Database migrated successfully")
	// Load sample data
	// loadSampleData(postgresConnURL)
}

// func tableExists(db *sql.DB, tableName string) (bool, error) {
// 	var exists bool
// 	query := `SELECT EXISTS (
// 		SELECT 1
// 		FROM information_schema.tables
// 		WHERE table_schema = 'public'
// 		AND table_name = $1
// 	);`
// 	err := db.QueryRow(query, tableName).Scan(&exists)
// 	return exists, err
// }

// func loadSampleData(connURL string) {
// 	db, err := sql.Open("postgres", connURL)
// 	if err != nil {
// 		log.Fatalf("Failed to connect to database: %v", err)
// 	}
// 	defer db.Close()

// 	// Tables to truncate
// 	tables := []string{
// 		"users",
// 		"categories",
// 		"products",
// 		"product_images",
// 		"orders",
// 		"order_items",
// 		"contacts",
// 		"addresses",
// 		"carts",
// 		"cart_items",
// 	}

// 	// Truncate tables if they exist
// 	for _, table := range tables {
// 		exists, err := tableExists(db, table)
// 		if err != nil {
// 			log.Fatalf("Error checking if table exists: %v", err)
// 		}
// 		if exists {
// 			_, err = db.Exec(fmt.Sprintf("TRUNCATE TABLE %s CASCADE;", table))
// 			if err != nil {
// 				log.Fatalf("Failed to truncate table %s: %v", table, err)
// 			}
// 			log.Printf("Table %s truncated successfully", table)
// 		} else {
// 			log.Printf("Table %s does not exist, skipping truncate", table)
// 		}
// 	}

// 	// Determine the file path based on the environment variable
// 	filePath := os.Getenv("SAMPLE_DATA_PATH")
// 	if filePath == "" {
// 		// Default path for local development
// 		filePath = "platform/migration/sample_data.sql"
// 	}

// 	// Get the absolute path
// 	absPath, err := filepath.Abs(filePath)
// 	if err != nil {
// 		log.Fatalf("Failed to get absolute path: %v", err)
// 	}
// 	fmt.Printf("Absolute path to sample data file: %s\n", absPath)

// 	data, err := os.ReadFile(absPath)
// 	if err != nil {
// 		log.Fatalf("Failed to read sample data file: %v", err)
// 	}

// 	_, err = db.Exec(string(data))
// 	if err != nil {
// 		log.Fatalf("Failed to execute sample data script: %v", err)
// 	}

// 	log.Println("Sample data loaded successfully")
// }
