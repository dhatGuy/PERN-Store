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
SELECT users.user_id, cart.*, cart_item.quantity, products.* FROM users join cart on cart.user_id = users.user_id
          join cart_item on cart.id = cart_item.cart_id JOIN products ON products.product_id = cart_item.product_id
          where users.user_id = 3
