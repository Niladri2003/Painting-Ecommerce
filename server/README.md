
# Painting-Ecommerce Backend
- [ApiDocs](https://documenter.getpostman.com/view/26905530/2sA3rxqD9b)
### Before doing anything rename .env.example -> .env
## Run backend in single command
```bash
 docker-compose up --build
```
stop backend
```bash
docker-compose down
```

### To run Postgresql container locally

```bash
docker run --name cgapp-postgres -d   -e POSTGRES_USER=postgres   -e POSTGRES_PASSWORD=password   -e POSTGRES_DB=postgres   -p 5432:5432   postgres
```
Storing backup locally(Replace this path with your desired one -/path/to/backup)
```bash
docker run --name cgapp-postgres -d  -e POSTGRES_USER=postgres  -e POSTGRES_PASSWORD=password -e POSTGRES_DB=postgres -v /path/to/backup:/docker-entrypoint-initdb.d  -p 5432:5432 postgres
```
Restoring the backup
```bash
docker exec -i cgapp-postgres pg_restore -U postgres -d postgres < /docker-entrypoint-initdb.d/dumpfile.dump
```
Run this to create a backup of your postgreSql database
```bash
docker exec -t cgapp-postgres pg_dump -U postgres -F c postgres > /postgresBackup/dumpfile.dump
```
For using PSQL in CMD
```bash
docker exec -it cgapp-postgres psql -U postgres
```


## Documentation

### steps for creating a route
1. create table for migration  in create_init_tables.up.sql file
2. create a model
3. create a query
4. add Queries in struct and return queries in database/open_db_connection.go file
5. create controllers
6. create route

For Creating Docker image.
```bash
docker build -t painting-ecommerce .
```

For running the container
```bash
docker run -p 5000:5000 --env-file .env painting-ecommerce
```
