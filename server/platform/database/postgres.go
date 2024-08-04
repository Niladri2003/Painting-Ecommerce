package database

import (
	"fmt"
	_ "github.com/jackc/pgx/v4/stdlib" // load pgx driver for PostgreSQL
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/pkg/utils"
	"os"
	"strconv"
	"time"
)

func PostgresSQLConnection() (*sqlx.DB, error) {
	//Define database connection settings.
	maxConn, _ := strconv.Atoi(os.Getenv("MAX_CONNECTION"))
	maxIdleConn, _ := strconv.Atoi(os.Getenv("MAX_IDLE_CONNECTION"))
	maxLifetimeConn, _ := strconv.Atoi(os.Getenv("MAX_LIFETIME"))

	// Build PostgreSQL connection URL.
	postgresConnURL, err := utils.ConnectionURLBuilder("postgres")
	fmt.Printf("Postgres connection URL: %s\n", postgresConnURL)
	if err != nil {
		return nil, err
	}

	//Define PostgresSQL
	db, err := sqlx.Connect("pgx", postgresConnURL)
	if err != nil {
		return nil, fmt.Errorf("error connecting to postgres: %v", err)
	}

	db.SetMaxIdleConns(maxIdleConn)
	db.SetMaxOpenConns(maxConn)
	db.SetConnMaxLifetime(time.Duration(maxLifetimeConn))

	// Try to ping database.
	if err := db.Ping(); err != nil {
		defer db.Close() // close database connection
		return nil, fmt.Errorf("error, not sent ping to database, %w", err)
	}

	return db, nil
}
