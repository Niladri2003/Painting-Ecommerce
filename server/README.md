
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
docker run --name cgapp-postgres --network test_network -d  -e POSTGRES_USER=postgres  -e POSTGRES_PASSWORD=password -e POSTGRES_DB=postgres -v /home/ec2-user/postgresBackup:/docker-entrypoint-initdb.d  -p 5432:5432 postgres
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
```bash
docker run -d --name painting-ecommerce   --network server_my_network   -e DB_HOST=cgapp-postgres   -e DB_PORT=5432   -e DB_USER=postgres   -e DB_PASSWORD=password   -e DB_NAME=postgres   -e DB_SSL_MODE=disable   -p 5000:5000   painting-ecommerce
```
Creating Backup inside postgres container
```bash
POSTGRES_PASSWORD=postgres pg_dump -U postgres -d postgres -f /backup/dump_date`date +%Y-%m-%d_%H_%M_%S`.sql
```
Copy backup from container to local
```bash
docker cp e51efef85b4d:/dump_date2024-08-12_07_55_58.sql dump_date2024-08-12_07_55_58.sql
```
Copy backup from local to container
```bash
docker cp dump_date2024-08-09_06_59_56.sql 19e924fd823c:/backup/dump_date2024-08-09_06_59_56.sql
```
Restore Backup inside the contaienr
```bash
psql -U postgres postgres < /backup/dump_date2024-08-09_06_59_56.sql 
```
