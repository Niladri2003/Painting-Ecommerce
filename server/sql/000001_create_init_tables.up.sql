-- Add UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- +migrate Up
SET TIMEZONE="Asia/Kolkata";

CREATE TABLE users (
                       id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
                       created_at TIMESTAMP WITH TIME ZONE NOW (),
                       updated_at TIMESTAMP NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password_hash VARCHAR(255) NOT NULL,
                       user_status INT NOT NULL,
                       user_role VARCHAR(25) NOT NULL
);
CREATE TABLE categories (
                            id UUID PRIMARY KEY,
                            name VARCHAR(255) NOT NULL UNIQUE,
                            description TEXT
);
CREATE TABLE products (
                          id UUID PRIMARY KEY,
                          title VARCHAR(255) NOT NULL,
                          description TEXT,
                          price DECIMAL(10, 2) NOT NULL, -- Adjust precision and scale as needed
                          category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE product_images (
                                id UUID PRIMARY KEY,
                                product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                                image_url TEXT NOT NULL,
                                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE orders (
                        id UUID PRIMARY KEY,
                        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
                        total DECIMAL(10, 2) NOT NULL,
                        status VARCHAR(50) NOT NULL, -- e.g., 'pending', 'completed', 'shipped'
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE order_items (
                             id UUID PRIMARY KEY,
                             order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
                             product_id UUID REFERENCES products(id) ON DELETE SET NULL,
                             quantity INT NOT NULL,
                             price DECIMAL(10, 2) NOT NULL, -- Price at the time of purchase
                             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);