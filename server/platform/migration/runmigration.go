package migration

import (
	"database/sql"
	"fmt"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/niladri2003/PaintingEcommerce/pkg/utils"
	"log"
	"os"
	"path/filepath"
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
	loadSampleData(postgresConnURL)
}
func loadSampleData(connURL string) {
	db, err := sql.Open("postgres", connURL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()
	// Clear the tables
	_, err = db.Exec(`
        TRUNCATE TABLE users CASCADE;
        TRUNCATE TABLE categories CASCADE;
        TRUNCATE TABLE products CASCADE;
        TRUNCATE TABLE product_images CASCADE;
        TRUNCATE TABLE orders CASCADE; 
        TRUNCATE TABLE order_items CASCADE;
        TRUNCATE TABLE contacts CASCADE;
        TRUNCATE TABLE addresses CASCADE;
        TRUNCATE TABLE carts CASCADE;
        TRUNCATE TABLE cart_items CASCADE;
    `)
	if err != nil {
		log.Fatalf("Failed to truncate tables: %v", err)
	}
	// Get the absolute path
	absPath, err := filepath.Abs("platform/migration/sample_data.sql")
	if err != nil {
		log.Fatalf("Failed to get absolute path: %v", err)
	}
	fmt.Printf("Absolute path to sample data file: %s\n", absPath)

	data, err := os.ReadFile(absPath)
	if err != nil {
		log.Fatalf("Failed to read sample data file: %v", err)
	}

	_, err = db.Exec(string(data))
	if err != nil {
		log.Fatalf("Failed to execute sample data script: %v", err)
	}

	log.Println("Sample data loaded successfully")
}
