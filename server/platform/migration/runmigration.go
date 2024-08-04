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
}
