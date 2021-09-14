--CREATE TABLE products (
--	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--	title text NOT NULL,
--	description text,
--	price integer
--)
--
--create extension if not exists "uuid-ossp";

--insert into products (title, description, price) values
--	('prod1', 'desc1', '1'),
--	('prod2', 'desc2', '2'),
--	('prod3', 'desc3', '3')

--CREATE TABLE stocks (
--	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--	stock_id uuid,
--	count integer,
--	foreign key ("stock_id") references "products" ("id")
--)

--insert into stocks (stock_id, count) values
--	('ac7f9839-5040-4f24-a78e-4f0226f7873e', '1'),
--	('d1099db5-af1e-4ccf-843e-f4a6611b0d1e', '1'),
--	('844378f4-da3b-4aa4-8e2d-eaec1cf6322e', '1')
