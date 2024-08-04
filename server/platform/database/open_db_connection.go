package database

import (
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/queries"
	"os"
)

type Queries struct {
	*queries.UserQueries
	*queries.CategoryQueries
}

// OpenDbConnection  func for opening database connection
func OpenDbConnection() (*Queries, error) {
	//Define Database connection variables.
	var (
		db  *sqlx.DB
		err error
	)
	//Get DB_TYPE value from .env file.
	dbType := os.Getenv("DB_TYPE")

	//Define a new Database connection with right DB type.
	switch dbType {
	case "pgx":
		db, err = PostgresSQLConnection()
	}
	if err != nil {
		return nil, err
	}
	return &Queries{
		UserQueries:     &queries.UserQueries{DB: db},
		CategoryQueries: &queries.CategoryQueries{DB: db},
	}, nil
}
