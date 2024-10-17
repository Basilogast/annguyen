-- Create a new database
CREATE DATABASE workcardsdb;

-- Create a new user with a password
CREATE USER workcardsuser WITH ENCRYPTED PASSWORD 'Hung08112003';

-- Grant all privileges on the new database to the new user
GRANT ALL PRIVILEGES ON DATABASE workcardsdb TO workcardsuser;

-- Connect to the new database
\c workcardsdb

-- Create the table for storing WorkCard data
CREATE TABLE IF NOT EXISTS workcards (
  id SERIAL PRIMARY KEY,
  size VARCHAR(50),
  img TEXT,
  text TEXT,
  pdfUrl TEXT,
  textPara TEXT[],
  detailsRoute VARCHAR(255)
);
