
# Painting-Ecommerce Backend


## To run Postgresql container locally

```bash
docker run --name cgapp-postgres -d   -e POSTGRES_USER=postgres   -e POSTGRES_PASSWORD=password   -e POSTGRES_DB=postgres   -p 5432:5432   postgres
```
For using PSQL in CMD
```bash
docker exec -it cgapp-postgres psql -U postgres
```

## Documentation

### steps for creating a route
1. create table for migration and in create_init_tables.up.sql file
2. create a model
3. create a query
4. add Queries in struct and return queries in database/open_db_connection.go file
5. create controllers
6. create route
