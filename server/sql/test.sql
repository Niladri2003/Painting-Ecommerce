-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                       created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       first_name VARCHAR(100) NOT NULL,
                       last_name VARCHAR(100) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password_hash VARCHAR(255),
                       user_status INT NOT NULL,
                       user_role VARCHAR(25) NOT NULL,
                       google_id VARCHAR(255), -- Optional Google ID for users signing in with Google
                       profile_picture VARCHAR(255) -- Optional profile picture URL
);

-- Addresses Table
CREATE TABLE addresses (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           user_id UUID NOT NULL,
                           first_name VARCHAR(100) NOT NULL,
                           last_name VARCHAR(100) NOT NULL,
                           country VARCHAR(100) NOT NULL,
                           street_address VARCHAR(255) NOT NULL,
                           town_city VARCHAR(100) NOT NULL,
                           state VARCHAR(100) NOT NULL,
                           pin_code VARCHAR(20) NOT NULL,
                           mobile_number VARCHAR(20) NOT NULL,
                           email VARCHAR(255) NOT NULL,
                           order_notes TEXT,
                           set_as_default BOOLEAN NOT NULL DEFAULT FALSE,
                           created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Categories Table
CREATE TABLE categories (
                            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                            name VARCHAR(255) NOT NULL UNIQUE,
                            description TEXT
);

-- Coupons Table
CREATE TABLE coupons (
                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                         coupon_code VARCHAR(50) NOT NULL UNIQUE,
                         validity DATE,
                         discount_percentage NUMERIC NOT NULL,
                         is_active BOOLEAN NOT NULL
);

-- Products Table
CREATE TABLE products (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          title VARCHAR(255) NOT NULL,
                          description TEXT,
                          original_price DECIMAL(10, 2) NOT NULL,
                          discounted_price DECIMAL(10, 2) NOT NULL,
                          is_active BOOLEAN NOT NULL,
                          category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
                          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          view_count INT DEFAULT 0,
                          click_count INT DEFAULT 0,
                          purchase_count INT DEFAULT 0,
                          average_rating DECIMAL(3, 2) DEFAULT 0.0,
                          review_count INT DEFAULT 0,
                          tags VARCHAR(255)[], -- Array of tags for search and categorization
                          boost_factor DECIMAL(3, 2) DEFAULT 1.0, -- Boost factor for search relevance
                          last_purchased_at TIMESTAMP WITH TIME ZONE
);

-- Product Sizes Table
CREATE TABLE products_size (
                               id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                               product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                               size VARCHAR(50),
                               charge DECIMAL(10, 2) NOT NULL
);

-- Product Subcategories Table
CREATE TABLE products_subcategory (
                                      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                                      subcategory VARCHAR(50),
                                      charge DECIMAL(10, 2) NOT NULL
);

-- Product Images Table
CREATE TABLE product_images (
                                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                                image_url TEXT NOT NULL,
                                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                        total DECIMAL(10, 2) NOT NULL,
                        coupon_code VARCHAR(50),
                        status VARCHAR(50) NOT NULL, -- e.g., 'pending', 'completed', 'shipped'
                        address_id UUID REFERENCES addresses(id) ON DELETE CASCADE,
                        invoice_url TEXT NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
                             id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                             order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
                             product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                             product_name VARCHAR(255) NOT NULL,
                             product_image TEXT NOT NULL,
                             size VARCHAR(50) NOT NULL,
                             subcategory VARCHAR(50) NOT NULL,
                             quantity INT NOT NULL,
                             quantity_price DECIMAL(10, 2) NOT NULL,
                             price DECIMAL(10, 2) NOT NULL, -- Price at the time of purchase
                             status VARCHAR(50) NOT NULL, -- e.g., 'approved', 'canceled'
                             created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Contacts Table (For 'Contact Us' feature)
CREATE TABLE contacts (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          first_name VARCHAR(100) NOT NULL,
                          last_name VARCHAR(100) NOT NULL,
                          email VARCHAR(100) NOT NULL,
                          phone VARCHAR(20) NOT NULL,
                          subject VARCHAR(200) NOT NULL,
                          message TEXT NOT NULL,
                          submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          replied BOOLEAN NOT NULL DEFAULT FALSE
);

-- Carts Table
CREATE TABLE carts (
                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                       user_id UUID NOT NULL,
                       is_coupon_applied BOOLEAN NOT NULL,
                       coupon_code VARCHAR(50),
                       discount_percentage NUMERIC NOT NULL,
                       created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Cart Items Table
CREATE TABLE cart_items (
                            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                            cart_id UUID NOT NULL,
                            product_id UUID NOT NULL,
                            product_name VARCHAR(255) NOT NULL,
                            product_image TEXT NOT NULL,
                            quantity INT NOT NULL CHECK (quantity > 0),
                            quantity_price DECIMAL(10, 2) NOT NULL,
                            after_discount_total_price DECIMAL(10, 2) NOT NULL,
                            total_price DECIMAL(10, 2) NOT NULL, -- Price at the time of adding to cart
                            product_size_id UUID NOT NULL,
                            product_subcategory_id UUID NOT NULL,
                            size VARCHAR(50) NOT NULL,
                            subcategory VARCHAR(50) NOT NULL,
                            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
                            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Reviews Table (with support for images)
CREATE TABLE reviews (
                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                         user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                         product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                         rating INT CHECK (rating >= 1 AND rating <= 5),
                         review_text TEXT,
                         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Review Images Table
CREATE TABLE review_images (
                               id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                               review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
                               image_url TEXT NOT NULL,
                               created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE wishlists (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                           created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wishlist_items (
                                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE,
                                product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
                              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                              order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
                              payment_method VARCHAR(50), -- e.g., 'credit_card', 'paypal'
                              amount DECIMAL(10, 2) NOT NULL,
                              transaction_status VARCHAR(50) NOT NULL, -- e.g., 'completed', 'failed'
                              created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE audit_logs (
                            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                            entity_type VARCHAR(50), -- e.g., 'order', 'user'
                            entity_id UUID NOT NULL,
                            action VARCHAR(50) NOT NULL, -- e.g., 'update', 'delete'
                            user_id UUID REFERENCES users(id) ON DELETE SET NULL,
                            changes JSONB NOT NULL, -- Store the before and after state
                            action_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE user_sessions (
                               id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                               user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                               login_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               logout_time TIMESTAMP WITH TIME ZONE,
                               ip_address VARCHAR(45),
                               device_info TEXT
);
CREATE TABLE notifications (
                               id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                               user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                               message TEXT NOT NULL,
                               is_read BOOLEAN NOT NULL DEFAULT FALSE,
                               created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE inventory (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                           quantity INT NOT NULL,
                           last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           supplier_id UUID -- Foreign key to a suppliers table, if needed
);
CREATE TABLE suppliers (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           name VARCHAR(255) NOT NULL,
                           contact_info TEXT,
                           created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email_verifications (
                                     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                     verification_token UUID NOT NULL,
                                     expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
                                     created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- User Product Interactions Table (for tracking views, clicks, purchases)
CREATE TABLE user_product_interactions (
                                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                           user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                           product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                                           interaction_type VARCHAR(50) NOT NULL, -- 'view', 'click', 'purchase'
                                           interaction_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- User Category Preferences Table (for personalized recommendations)
CREATE TABLE user_category_preferences (
                                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                           user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                           category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
                                           preference_score DECIMAL(5, 2) NOT NULL DEFAULT 0.0, -- Score indicating user's preference for this category
                                           last_interaction TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Product Price History Table (for tracking price trends)
CREATE TABLE product_price_history (
                                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                       product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                                       price DECIMAL(10, 2) NOT NULL,
                                       recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE analytics (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                           product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                           action VARCHAR(50) NOT NULL, -- e.g., 'view', 'add_to_cart', 'purchase'
                           action_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           additional_data JSONB -- For storing extra info like session data, referral source, etc.
);