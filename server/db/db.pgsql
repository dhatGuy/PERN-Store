-- select cart.*, users.*, cart_items.*
-- from cart 
-- INNER JOIN users
-- on users.user_id = cart.user_id
-- INNER JOIN cart_items 
-- on cart_items.id = cart.cart_id
-- WHERE users.user_id = 1;
-- select * from cart_items;

-- insert into cart_items(cart_id, product_id, quantity, total_amount)
-- VALUES (1, 4, 1, 0);
-- select * from cart;
-- SELECT cart.* from users 
--       join cart on users.user_id = cart.user_id;
      -- join cart_item on cart.id = cart_item.cart_id ;
      -- join products on products.product_id = cart_item.product_id 
      -- where users.user_id = 13;


-- select * from cart;
-- select * from cart_item;
-- select * from products;

-- SELECT * FROM cart_item
-- Select products.*, cart_item.quantity from cart_item join products on cart_item.product_id = products.product_id where cart_item.cart_id = 3


-- SELECT cart.id cart_id, products.*, cart_item.quantity from users 
--       join cart on users.user_id = cart.user_id
--       join cart_item on cart.id = cart_item.cart_id
--       join products on products.product_id = cart_item.product_id
--       where users.user_id = 13;

-- SELECT users.user_id, products.*, cart_item.quantity, cart.* as cart_id from users join cart on users.user_id = cart.user_id join cart_item on cart.id = cart_item.cart_id join products on products.product_id = cart_item.product_id where users.user_id = 11

select * from cart_item where cart_item.cart_id = 3 AND cart_item.product_id = 3 
