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

# Set environment variables
ENV STAGE_STATUS="dev"
ENV SERVER_READ_TIMEOUT=60
#ENV SAMPLE_DATA_PATH="/root/platform/migration/sample_data.sql"

# Server settings:
ENV SERVER_HOST="0.0.0.0"
ENV SERVER_PORT=5000
ENV SERVER_READ_TIMEOUT=60

# Database settings:
#ENV DB_TYPE="pgx"
#ENV DB_HOST=localhost
#ENV DB_PORT=5432
#ENV DB_USER=postgres
#ENV DB_PASSWORD=password
#ENV DB_NAME=postgres
#ENV DB_SSL_MODE=disable
#ENV DB_MAX_CONNECTIONS=100
#ENV DB_MAX_IDLE_CONNECTIONS=10
#ENV DB_MAX_LIFETIME_CONNECTIONS=2

# JWT settings:
ENV JWT_SECRET_KEY="secret"
ENV JWT_SECRET_KEY_EXPIRE_MINUTES_COUNT=15
ENV JWT_REFRESH_KEY="refresh"
ENV JWT_REFRESH_KEY_EXPIRE_HOURS_COUNT=720

# Redis settings:
ENV REDIS_HOST="13.60.87.78"
ENV REDIS_PORT=6379
ENV REDIS_PASSWORD="redis00"
ENV REDIS_DB_NUMBER=0

#Cloudinary
ENV CLOUDINARY_URL="cloudinary://569865985489634:7qmx-6bkmMHnKgY6Skot72hgvBA@doqoyoxxp"
ENV CLOUDINARY_CLOUD_NAME="doqoyoxxp"
ENV CLOUDINARY_API_KEY="569865985489634"
ENV CLOUDINARY_API_SECRET="7qmx-6bkmMHnKgY6Skot72hgvBA"

# Mail
ENV EMAIL_FROM=abhisheksantra99@gmail.com
ENV SMTP_HOST=smtp.gmail.com
ENV SMTP_PORT=587
ENV EMAIL_USERNAME=abhisheksantra99@gmail.com
ENV EMAIL_PASSWORD=qggrtvpxbbqcautz
#Google authentication

ENV GOOGLE_CLIENT_ID=687753841844-ssa190dj6dvp7ukbuqsps33lcijuc9bt.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV REDIRECT_URL=https://ecommerce.niladriadak.tech/api/v1/user/google/callback
ENV FRONTEND_URL=https://painting-ecommerce.vercel.app


# Command to run the executable
CMD ["./main"]
