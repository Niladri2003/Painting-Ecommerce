# Start with the official Golang base image
FROM golang:1.20-alpine as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -o main .

# Start a new stage from scratch
FROM alpine:latest

# Set the Current Working Directory inside the container
WORKDIR /root/

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/main .

# Copy .env file if needed
COPY .env .
# Copy migration files
COPY sql /root/sql
COPY platform/migration/sample_data.sql /root/platform/migration/

#COPY Email Template
COPY templates /root/templates

# Expose port 3000 to the outside world
EXPOSE 5000



# Command to run the executable
CMD ["./main"]
