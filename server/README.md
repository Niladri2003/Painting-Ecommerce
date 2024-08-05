
Run Docker PostgresSql container-
docker run --name cgapp-postgres -d   -e POSTGRES_USER=postgres   -e POSTGRES_PASSWORD=password   -e POSTGRES_DB=postgres   -p 5432:5432   postgres

ok ?


steps for creating a route
1. create a model
2. create a query
3. create controllers
4. create route
5. add Queries in struct and return queries in database/open_db_connection.go file
