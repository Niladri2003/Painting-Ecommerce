-- +migrate Down
DROP TABLE users;
DROP TABLE order_items;
DROP TABLE product_attributes;
DROP TABLE orders;
DROP TABLE product_images;
DROP TABLE products;
DROP TABLE categories;