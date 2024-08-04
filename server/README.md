
Run Docker PostgresSql container-
docker run --name cgapp-postgres -d   -e POSTGRES_USER=postgres   -e POSTGRES_PASSWORD=password   -e POSTGRES_DB=postgres   -p 5432:5432   postgres
