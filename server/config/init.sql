--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.2

-- Started on 2021-05-08 10:09:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 3676077)
-- Name: cart; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 3676080)
-- Name: cart_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_item (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 3676083)
-- Name: cartItems_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_item_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4041 (class 0 OID 0)
-- Dependencies: 204
-- Name: cartItems_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_item_id_seq" OWNED BY public.cart_item.id;


--
-- TOC entry 205 (class 1259 OID 3676085)
-- Name: cart_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4042 (class 0 OID 0)
-- Dependencies: 205
-- Name: cart_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.id;


--
-- TOC entry 206 (class 1259 OID 3676087)
-- Name: order_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_item (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 3676090)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4043 (class 0 OID 0)
-- Dependencies: 207
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_item.id;


--
-- TOC entry 208 (class 1259 OID 3676095)
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    status character varying(20) NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    amount real,
    total integer,
    stripe_payment_id character varying(100)
);


--
-- TOC entry 209 (class 1259 OID 3676099)
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4044 (class 0 OID 0)
-- Dependencies: 209
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- TOC entry 210 (class 1259 OID 3676101)
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    name character varying(50) NOT NULL,
    price real NOT NULL,
    description text DEFAULT 'No Description'::text NOT NULL,
    image_url character varying
);


--
-- TOC entry 211 (class 1259 OID 3676133)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4045 (class 0 OID 0)
-- Dependencies: 211
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.product_id;


--
-- TOC entry 216 (class 1259 OID 17123848)
-- Name: resetTokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."resetTokens" (
    email character varying NOT NULL,
    token character varying NOT NULL,
    used boolean DEFAULT false NOT NULL,
    expiration timestamp without time zone,
    id integer NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 17211931)
-- Name: resetTokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."resetTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4046 (class 0 OID 0)
-- Dependencies: 217
-- Name: resetTokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."resetTokens_id_seq" OWNED BY public."resetTokens".id;


--
-- TOC entry 215 (class 1259 OID 16089310)
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    user_id integer NOT NULL,
    content text NOT NULL,
    rating integer NOT NULL,
    product_id integer NOT NULL,
    date date DEFAULT CURRENT_DATE NOT NULL,
    id integer NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 16089308)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4047 (class 0 OID 0)
-- Dependencies: 214
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 212 (class 1259 OID 3676135)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    password character varying(200),
    email character varying(100) NOT NULL,
    fullname character varying(100) NOT NULL,
    username character varying(50) NOT NULL,
    google_id character varying(100),
    roles character varying(15)[] DEFAULT '{customer}'::character varying[] NOT NULL,
    address character varying(200),
    state character varying(100),
    city character varying(100),
    country character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 213 (class 1259 OID 3676138)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4048 (class 0 OID 0)
-- Dependencies: 213
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3857 (class 2604 OID 3676140)
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);


--
-- TOC entry 3858 (class 2604 OID 3676141)
-- Name: cart_item id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item ALTER COLUMN id SET DEFAULT nextval('public."cartItems_item_id_seq"'::regclass);


--
-- TOC entry 3860 (class 2604 OID 3676142)
-- Name: order_item id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 3862 (class 2604 OID 3676143)
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- TOC entry 3864 (class 2604 OID 3676144)
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3871 (class 2604 OID 17211933)
-- Name: resetTokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."resetTokens" ALTER COLUMN id SET DEFAULT nextval('public."resetTokens_id_seq"'::regclass);


--
-- TOC entry 3869 (class 2604 OID 16089314)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 3865 (class 2604 OID 3676145)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3877 (class 2606 OID 3676147)
-- Name: cart_item cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY (id);


--
-- TOC entry 3873 (class 2606 OID 3676149)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- TOC entry 3879 (class 2606 OID 18545690)
-- Name: cart_item cartproduct_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cartproduct_id UNIQUE (cart_id, product_id);


--
-- TOC entry 3887 (class 2606 OID 17607404)
-- Name: users email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email) INCLUDE (email);


--
-- TOC entry 3890 (class 2606 OID 17607408)
-- Name: users google_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT google_id UNIQUE (google_id) INCLUDE (google_id);


--
-- TOC entry 3899 (class 2606 OID 17211941)
-- Name: resetTokens id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."resetTokens"
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- TOC entry 3881 (class 2606 OID 3676151)
-- Name: order_item order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3883 (class 2606 OID 3676153)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- TOC entry 3885 (class 2606 OID 3676155)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 3859 (class 2606 OID 3676156)
-- Name: cart_item quantity; Type: CHECK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE public.cart_item
    ADD CONSTRAINT quantity CHECK ((quantity > 0)) NOT VALID;


--
-- TOC entry 3897 (class 2606 OID 16089319)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (user_id, product_id);


--
-- TOC entry 3875 (class 2606 OID 3676158)
-- Name: cart user_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT user_id UNIQUE (user_id);


--
-- TOC entry 3892 (class 2606 OID 17607406)
-- Name: users username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username UNIQUE (username) INCLUDE (username);


--
-- TOC entry 3895 (class 2606 OID 3676163)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3888 (class 1259 OID 19151651)
-- Name: email_lower_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX email_lower_idx ON public.users USING btree (lower((email)::text));


--
-- TOC entry 3893 (class 1259 OID 19152037)
-- Name: username_unique_lower_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX username_unique_lower_idx ON public.users USING btree (lower((username)::text));


--
-- TOC entry 3900 (class 2606 OID 19157388)
-- Name: cart cart_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_id FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3901 (class 2606 OID 19157445)
-- Name: cart_item cart_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_id FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3904 (class 2606 OID 19157640)
-- Name: order_item order_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE SET NULL NOT VALID;


--
-- TOC entry 3902 (class 2606 OID 19157450)
-- Name: cart_item product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE SET NULL NOT VALID;


--
-- TOC entry 3903 (class 2606 OID 19157468)
-- Name: order_item product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE SET NULL NOT VALID;


--
-- TOC entry 3906 (class 2606 OID 16089320)
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- TOC entry 3907 (class 2606 OID 16089325)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3905 (class 2606 OID 19157473)
-- Name: orders user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4039 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO sdimoitvuamcwf;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 4040 (class 0 OID 0)
-- Dependencies: 672
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON LANGUAGE plpgsql TO sdimoitvuamcwf;


-- Completed on 2021-05-08 10:10:04

--
-- PostgreSQL database dump complete
--

