-- CREATE TABLE products (
-- 	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	title text NOT NULL,
-- 	description text,
-- 	price integer
-- )

-- CREATE TABLE stocks (
-- 	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	stock_id uuid,
-- 	count integer,
-- 	foreign key ("stock_id") references "products" ("id")
-- )

-- create extension if not exists "uuid-ossp";

-- drop table stocks;

-- insert into stocks (stock_id, count) values
-- 	('869caa7a-6765-4764-af8f-2984c8614fd8', '1'),
-- 	('e869ac2b-6b1b-4054-8b64-5db92807d423', '1'),
-- 	('dda12042-6af6-49c2-9082-2f9270f0ed03', '1'),
-- 	('c20352e5-04fb-487e-8d01-363619a92b4c', '1'),
-- 	('73fd8c84-2460-4300-a0da-b2878ae22b0d', '1'),
-- 	('39fadb70-cab7-4e12-abb4-4479958ed7ca', '1')

-- insert into products (title, description, price) values
-- 	('prod1', 'desc1', '1'),
-- 	('prod2', 'desc2', '2'),
-- 	('prod3', 'desc3', '3')
