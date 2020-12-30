-- CREATE TABLE products
-- (
--  ProductId serial NOT NULL PRIMARY KEY,
--  ProductName varchar(100) NOT NULL UNIQUE,
--  Price decimal(12,2) NOT NULL
-- );

-- COMMENT ON TABLE products IS 'Basic information 
-- about Product';

-- CREATE TABLE customers (
--  customerId serial NOT NULL PRIMARY KEY,
--  username varchar(50) NOT NULL,
--  password varchar(20) NOT NULL, 
--  fullname varchar(20) NOT NULL,
--  email varchar(50) NOT NULL,
--  dataJoined DATE DEFAULT CURRENT_DATE
-- );

-- CREATE TABLE cart
-- (
--  CartId serial NOT NULL PRIMARY KEY,
--  ProductId integer NOT NULL REFERENCES products(productId),
--  customerId    integer NOT NULL REFERENCES customers(customerId),
--  quantity  integer NOT NULL
-- );

-- CREATE TABLE orders
-- (
--  OrderId     serial PRIMARY KEY,
--  customerId      integer NOT NULL REFERENCES customers( customerId ),
--  CartId      integer NOT NULL REFERENCES cart( cartId ),
--  OrderDate   DATE DEFAULT LOCALTIMESTAMP(0),
--  TotalAmount decimal(12,2) NOT NULL
-- );

-- COMMENT ON TABLE orders IS 'Order information
-- like Date, Amount';


-- select * from product;
-- SELECT
--   constraint_name, table_name, column_name
-- FROM
--   information_schema.key_column_usage
-- WHERE
--   table_name = 'order'
