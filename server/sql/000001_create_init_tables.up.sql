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

