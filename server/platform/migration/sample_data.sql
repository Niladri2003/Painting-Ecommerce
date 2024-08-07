-- sample_data.sql

-- Insert sample data into users table
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'user@user.com') THEN
            INSERT INTO users (id, created_at, updated_at, email, password_hash, user_status, user_role)
            VALUES (uuid_generate_v4(), NOW(), NOW(), 'user@user.com', '$2a$04$FH8zN/COJjM.ET/ta0spXuuzDXzSBHFACvPAd/.y0OgKM6KsKnkLm', 1, 'user');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@admin.com') THEN
            INSERT INTO users (id, created_at, updated_at, email, password_hash, user_status, user_role)
            VALUES (uuid_generate_v4(), NOW(), NOW(), 'admin@admin.com', '$2a$04$FH8zN/COJjM.ET/ta0spXuuzDXzSBHFACvPAd/.y0OgKM6KsKnkLm', 1, 'admin');
        END IF;
    END
$$;
-- Insert sample data into categories table
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Talapatra') THEN
            INSERT INTO categories (id, name, description)
            VALUES (uuid_generate_v4(), 'Talapatra', 'Also known as palm leaf painting, this ancient and sacred art form from Odisha, India involves treating palm leaves with turmeric, etching stories with an iron tool, and coloring with natural dyes.');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Pattachitra') THEN
            INSERT INTO categories (id, name, description)
            VALUES (uuid_generate_v4(), 'Pattachitra', 'Pattachitra is a traditional style of painting from the eastern Indian states of Odisha and West Bengal that originated centuries ago.');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Modern Art') THEN
            INSERT INTO categories (id, name, description)
            VALUES (uuid_generate_v4(), 'Modern Art', 'Modern art is a term that encompasses many different movements and ideas in art that reject traditional techniques and mainstream values.');
        END IF;
    END
$$;

-- Insert sample data into products table

DO
$$
    DECLARE
        product1_id UUID := uuid_generate_v4();
        product2_id UUID := uuid_generate_v4();
        product3_id UUID := uuid_generate_v4();
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM products WHERE title = 'Product 1') THEN
            INSERT INTO products (id, title, description, price, category_id)
            VALUES (product1_id, 'Krishna Painting', 'Start Your Journey Towards Harmony, Balance and Prosperity in Life with Tree of Life Paintings, symbolizing many aspects of Science, Religion, Folklore, Philosophy, and Mythology.', 4050, (SELECT id FROM categories WHERE name = 'Pattachitra'));
        END IF;

        IF NOT EXISTS (SELECT 1 FROM products WHERE title = 'Product 2') THEN
            INSERT INTO products (id, title, description, price, category_id)
            VALUES (product2_id, 'Radha Krishna', 'The ancient art innovators at Odisha, refined and devised a new technique of Etching and Painting on Palm leaves', 2421, (SELECT id FROM categories WHERE name = 'Talapatra'));
        END IF;

        IF NOT EXISTS (SELECT 1 FROM products WHERE title = 'Product 3') THEN
            INSERT INTO products (id, title, description, price, category_id)
            VALUES (product3_id, 'Modern Sketch Wall art', 'A Perfect Wall Decoration Art Piece For Living Room, Bedroom, Kitchen, Dining Room, Hotel, Cafe, Bar Etc', 253, (SELECT id FROM categories WHERE name = 'Modern Art'));
        END IF;

        -- Product Images
        IF NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = product1_id AND image_url = 'https://res.cloudinary.com/doqoyoxxp/image/upload/v1722969172/paintings_image/ileykf6ctrb3yiiuuptz.webp') THEN
            INSERT INTO product_images (id, product_id, image_url)
            VALUES (uuid_generate_v4(), product1_id, 'https://res.cloudinary.com/doqoyoxxp/image/upload/v1722969172/paintings_image/ileykf6ctrb3yiiuuptz.webp');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = product1_id AND image_url = 'https://res.cloudinary.com/doqoyoxxp/image/upload/v1723014998/paintings_image/itlhztaqcbvex83de593.webp') THEN
            INSERT INTO product_images (id, product_id, image_url)
            VALUES (uuid_generate_v4(), product1_id, 'https://res.cloudinary.com/doqoyoxxp/image/upload/v1723014998/paintings_image/itlhztaqcbvex83de593.webp');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = product2_id AND image_url = 'https://res.cloudinary.com/doqoyoxxp/image/upload/v1722922899/paintings_image/d7ky8gwthnhdvhhou69q.webp') THEN
            INSERT INTO product_images (id, product_id, image_url)
            VALUES (uuid_generate_v4(), product2_id, 'https://res.cloudinary.com/doqoyoxxp/image/upload/v1722922899/paintings_image/d7ky8gwthnhdvhhou69q.webp');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = product3_id AND image_url = 'https://res.cloudinary.com/doqoyoxxp/image/upload/v1722923481/paintings_image/ckcdnln48y9wit2vssui.webp') THEN
            INSERT INTO product_images (id, product_id, image_url)
            VALUES (uuid_generate_v4(), product3_id, 'https://res.cloudinary.com/doqoyoxxp/image/upload/v1722923481/paintings_image/ckcdnln48y9wit2vssui.webp');
        END IF;

    END
$$;
-- Insert sample data into orders table

-- Insert sample data into orders table
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM orders WHERE total = 719.98 AND user_id = (SELECT id FROM users WHERE email = 'user@user.com')) THEN
            INSERT INTO orders (id, user_id, total, status, created_at, updated_at)
            VALUES
                (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user@user.com'), 719.98, 'completed', NOW(), NOW());
        END IF;
    END
$$;

-- Insert sample data into order_items table
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM order_items WHERE order_id = (SELECT id FROM orders WHERE total = 719.98) AND product_id = (SELECT id FROM products WHERE title = 'Radha Krishna')) THEN
            INSERT INTO order_items (id, order_id, product_id, quantity, price, created_at)
            VALUES
                (uuid_generate_v4(), (SELECT id FROM orders WHERE total = 719.98), (SELECT id FROM products WHERE title = 'Radha Krishna'), 1, (SELECT price FROM products WHERE title='Radha Krishna'), NOW());
        END IF;

        IF NOT EXISTS (SELECT 1 FROM order_items WHERE order_id = (SELECT id FROM orders WHERE total = 1019.98) AND product_id = (SELECT id FROM products WHERE title = 'Modern Sketch Wall art')) THEN
            INSERT INTO order_items (id, order_id, product_id, quantity, price, created_at)
            VALUES
                (uuid_generate_v4(), (SELECT id FROM orders WHERE total = 1019.98), (SELECT id FROM products WHERE title = 'Laptop'), 1, 999.99, NOW());
        END IF;
    END
$$;

-- Insert sample data into contacts table
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM contacts WHERE email = 'john@example.com' AND message = 'I have a question about your products.') THEN
            INSERT INTO contacts (id, first_name, last_name, email, phone, subject, message, submitted_at, replied)
            VALUES
                (uuid_generate_v4(), 'John', 'Doe', 'john@example.com', '1234567890', 'Inquiry', 'I have a question about your products.', NOW(), FALSE);
        END IF;
    END
$$;

-- Insert sample data into addresses table
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM addresses WHERE email = 'jane@example.com' AND street_address = '123 Main St') THEN
            INSERT INTO addresses (id, user_id, first_name, last_name, country, street_address, town_city, state, pin_code, mobile_number, email, order_notes, created_at, updated_at)
            VALUES
                (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user@user.com'), 'Jane', 'Doe', 'USA', '123 Main St', 'Springfield', 'IL', '62701', '0987654321', 'jane@example.com', 'Please deliver in the evening.', NOW(), NOW());
        END IF;
    END
$$;

-- -- Insert sample data into carts and cart_items tables
-- INSERT INTO carts (id, user_id, created_at, updated_at)
-- VALUES
--     (uuid_generate_v4(), (SELECT id FROM users WHERE email='user1@example.com'), NOW(), NOW());
--
-- INSERT INTO cart_items (id, cart_id, product_id, quantity, price, created_at, updated_at)
-- VALUES
--     (uuid_generate_v4(), (SELECT id FROM carts WHERE user_id=(SELECT id FROM users WHERE email='user1@example.com')), (SELECT id FROM products WHERE title='Novel'), 2, 19.99, NOW(), NOW());
