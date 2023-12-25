CREATE TABLE public.cart
(
    id SERIAL NOT NULL,
    user_id integer UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.cart_item
(
    id SERIAL NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (id),
    UNIQUE (cart_id, product_id)
);

CREATE TABLE public.order_item
(
    id SERIAL NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TYPE "payment" AS ENUM (
  'PAYSTACK',
  'STRIPE'
);

CREATE TABLE public.orders
(
    order_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    status character varying(20) NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    amount real,
    total integer,
    ref character varying(100),
    payment_method payment,
    PRIMARY KEY (order_id)
);

CREATE TABLE public.products
(
    product_id SERIAL NOT NULL,
    name character varying(100) NOT NULL UNIQUE,
    slug character varying(100) NOT NULL UNIQUE,
    price real NOT NULL,
    description text NOT NULL,
    image_url character varying,
    PRIMARY KEY (product_id)
);

CREATE TABLE public."resetTokens"
(
    id SERIAL NOT NULL,
    email character varying NOT NULL,
    token character varying NOT NULL,
    used boolean DEFAULT false NOT NULL,
    expiration timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE public.reviews
(
    user_id integer NOT NULL,
    content text NOT NULL,
    rating integer NOT NULL,
    product_id integer NOT NULL,
    date date NOT NULL,
    id integer NOT NULL,
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE public.users
(
    user_id SERIAL NOT NULL,
    password character varying(200),
    email character varying(100) UNIQUE NOT NULL,
    fullname character varying(100) NOT NULL,
    username character varying(50) UNIQUE NOT NULL,
    google_id character varying(100) UNIQUE,
    roles character varying(10)[] DEFAULT '{customer}'::character varying[] NOT NULL,
    address character varying(200),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

ALTER TABLE public.cart
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (user_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE public.cart_item
    ADD FOREIGN KEY (cart_id)
    REFERENCES public.cart (id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE public.cart_item
    ADD FOREIGN KEY (product_id)
    REFERENCES public.products (product_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE public.order_item
    ADD FOREIGN KEY (order_id)
    REFERENCES public.orders (order_id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE public.order_item
    ADD FOREIGN KEY (product_id)
    REFERENCES public.products (product_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE public.orders
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (user_id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE public.reviews
    ADD FOREIGN KEY (product_id)
    REFERENCES public.products (product_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE public.reviews
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (user_id)
    ON DELETE SET NULL
    NOT VALID;

CREATE UNIQUE INDEX users_unique_lower_email_idx
    ON public.users (lower(email));

CREATE UNIQUE INDEX users_unique_lower_username_idx
    ON public.users (lower(username));

    -- Seed data for products table 
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (1, 'Swiss Cheese', 'swiss-cheese', 956.97, 'Swiss cheese is a mild cow''s milk cheese with a firmer texture than baby Swiss. The flavor is light, sweet, and nutty. Swiss cheese is distinguished by its luster, pale yellow color, and large holes (called eyes) caused by carbon dioxide released during the maturation process.', 'https://i.ibb.co/N16wJ48/swiss-cheese.png');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (2, 'Pears', 'pears', 759.19, 'Pears are rich in essential antioxidants, plant compounds, and dietary fiber. They pack all of these nutrients in a fat free, cholesterol free, 100 calorie package.', 'https://i.ibb.co/4fn5HJv/pear.png');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (3, 'Wasabi Paste', 'wasabi-paste', 669.45, 'Wasabi paste is spicy and pungent in flavour and is most commonly served with sushi and sashimi.', 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (4, 'Soup - Cambells Chicken', 'soup-cambells-chicken', 707.1, 'You''ll enjoy serving delicious, nutritious Campbells Chicken Noodle Soup to your children. Kids love Campbells Chicken Noodle Soup because it has bite-sized chicken, slurpable noodles, and a warm, savory broth. 12 cans weighing 10.75 oz each. Cans with a condensed flavor and an easy-to-open pop top. It''s a quick and easy way to warm up mealtime for your kids at any time.', 'https://i.ibb.co/Vp9fw0F/campbell-chicken-soup.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (5, 'Triple Sec-Mcguinness', 'triple-sec-mcguinness', 753.58, 'When mixed with your favorite cocktail, McGuinness Triple Sec becomes three times more delicious. The drink''s name means "dry" in French, and "triple" implies three times as dry, so it''s no surprise that people fall in love with this whisky flavor.', 'https://i.ibb.co/3TVtKHm/triple.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (6, 'Sage Ground', 'sage-ground', 936.89, 'Sage is an excellent herb for seasoning fatty meats like pork, lamb, mutton, and game (goose or duck). It also complements onions, eggplant, tomatoes, and potatoes. Sage is frequently used in stuffings and cheeses.', 'https://i.ibb.co/B65SyN5/sage-ground.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (7, 'Beef Consomme', 'beef-consume', 897.34, 'A sauce or soup base made from clarified meat stock (usually beef, veal, or poultry, but also fish) into a clear and flavorful liquid broth. Egg whites are used to clarify the meat stock as well as any additional ingredients such as vegetables and/or herbs. While the mixture is being brought to a boil, it is being stirred. The boiled solution is no longer stirred as the egg whites solidify on top of the mixture, allowing the fats and impurities to be absorbed or attached to the white.', 'https://i.ibb.co/Np4L8bs/beef-consomme.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (8, 'Sausage Chorizo', 'sausage-chorizo', 782.82, 'Chorizo is a highly seasoned chopped or ground pork sausage that is commonly found in Spanish and Mexican cuisine. Mexican chorizo is made from fresh (raw, uncooked) pork, whereas Spanish chorizo is typically smoked.', 'https://i.ibb.co/hXsSSCt/Sausage-Chorizo.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (9, 'Apple Custard', 'apple-custard', 802.23, 'Custard apples have delicious mellow flesh that is almost as soft as custard. Custard apples are thought to have originated in South America and the West Indies. These apples are usually heart or oval in shape and can weigh up to 450g. They have quilted skin that is light tan or greenish in color and turns brown as the fruit ripens.', 'https://i.ibb.co/ctRZSqC/sugar-apple-custard-apple-sharifa-1.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (10, 'Bacardi Breezer', 'bacardi-breezer', 890.29, 'The Bacardi Breezer is an excellent way to enjoy the world''s most popular rum – Bacardi. Bacardi Breezer Cranberry is a refreshing drink made from Bacardi rum, real cranberry juice, and carbonated water.', 'https://i.ibb.co/4f81wgz/bacardi.png');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (11, 'Pita Bread', 'pita-bread', 935.72, 'A versatile flat bread that is soft and slightly chewy on the inside and often has a pocket inside as a result of baking the bread in a hot oven. Pita bread is frequently mistakenly thought to be unleavened, but it is usually leavened with yeast. The bread can be eaten plain or with a drizzle of olive oil.', 'https://i.ibb.co/G21ZsqY/Original-Pita-Bread-Front-1200x1200.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (12, 'English Muffins', 'english-muffins', 979.29, 'A small, round, yeast-leavened sourdough bread that is commonly sliced horizontally, toasted, and buttered. In North America and Australia, it is commonly eaten for breakfast, often with sweet or savory toppings such as fruit jam or honey, or eggs, sausage, bacon, or cheese.', 'https://i.ibb.co/B6pr46Z/muffins.png');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (13, 'Mince - Meat Filling', 'mince-meat-filling', 611.56, 'Mincemeat is a combination of chopped dried fruit, distilled spirits, and spices, as well as occasionally beef suet, beef, or venison. Usually used as filling for mince pies during Christmas, but it tastes great mixed with vanilla ice cream, as well', 'https://i.ibb.co/mCMhF9N/meat-filling.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (14, 'Pate - Cognac', 'pate-cognac', 787.14, 'Pâté made with pork liver and meat that has been infused with cognac. The spirits complement the pâté''s rich, smooth flavor, which is sure to appeal to foodies.', 'https://i.ibb.co/8j9ghkk/Pate-Cognac.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (15, 'Lamb Shoulder (Boneless)', 'lamb-shoulder', 605, 'Great for roasts, stews or any lamb recipe that has a marinade or a long slow cooking time and temperature.', 'https://i.ibb.co/h9Bm7nP/lamb-shoulder.png');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (16, 'Icecream - Dark Super Cone', 'icecream-dark-super-cone', 867.05, 'Natural flavors, colors, and fragrances Contains no peanuts or nuts. 4 cones of French Vanilla ice cream and 4 cones of Dark Chocolate ice cream with a thick dark chocolate core These Super Cones are made with 100% Canadian dairy and are wrapped in dark chocolate sugar cones with a chocolate topping. A fantastic flavor offering in a great family package.
Delectables for a single serving. Produced in a peanut and nut-free environment.', 'https://i.ibb.co/KXqcnsG/icecream.png');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (17, 'Puree Raspberry', 'puree-raspberry', 717.68, 'Make the perfect summer sorbet to cool off in style! This 100% natural frozen puree is made of 90% fruit and 10% sugar, with no artificial flavors, colorings, or preservatives: simple, fresh, and delicious! Make sorbets, smoothies, ice creams, jellies and jams, sauces, and pastry fillings with this raspberry puree.', 'https://i.ibb.co/1LX9RMw/puree-raspberry.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (18, 'Black Currant Jelly', 'black-currant jelly',898.42, 'The natural flavor of the fruit is preserved by gently cooking in the French countryside tradition.
Sweetened only with vineyard ripened grape and fruit juices, 100 percent from fruit Authentic French Recipe, Gently cooked to preserve the natural flavor of the fruit, Gluten-Free, Only Natural Sugars, Non-Genetically Modified Ingredients, No Cane Sugars, Corn Syrups, Artificial Sweeteners, Colors, Flavors, or Preservatives, All Natural Ingredients', 'https://i.ibb.co/znrFfPt/jam.jpg');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (19, 'Rice - 7 Grain Blend', 'rice-7-grain-blend', 732.36, 'Rice with a brown hue. Barley. Millet. Flax seed is a type of seed. Wheat. Quinoa in a red color. Rice from the wild. Microwave for 90 seconds in the pouch. USDA certified organic. 100% Whole Grain: 44 g or more per serving Consume 48 g or more of whole grains per day. You''re only 90 seconds away from a nutritious side dish or a meal on its own. It''s that easy!', 'https://i.ibb.co/Srv1Hjr/rice.png');
INSERT INTO public.products (product_id, name, slug, price, description, image_url) VALUES (20, 'Saskatoon Berries - Frozen', 'saskatoon-berries-frozen', 606.2, 'Raw plant-based superfood jam-packed with nutrients to get you through the day! We can keep all of the benefits and flavors of fresh Saskatoon Berries by freeze drying them, making them an easy on-the-go treat! They''re great as a healthy snack or added to cereals, smoothies, salads, and baking. A healthy diet high in vegetables and fruits may lower the risk of certain types of cancer.', 'https://i.ibb.co/ZcPjq1Y/berry.png');
