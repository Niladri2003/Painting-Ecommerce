--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    country character varying(100) NOT NULL,
    street_address character varying(255) NOT NULL,
    town_city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    pin_code character varying(20) NOT NULL,
    mobile_number character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    order_notes text,
    set_as_default boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cart_id uuid NOT NULL,
    product_id uuid NOT NULL,
    product_name character varying(255) NOT NULL,
    product_image text NOT NULL,
    quantity integer NOT NULL,
    quantity_price numeric(10,2) NOT NULL,
    after_discount_total_price numeric(10,2) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    product_size_id uuid NOT NULL,
    product_subcategory_id uuid NOT NULL,
    size character varying(50) NOT NULL,
    subcategory character varying(50) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT cart_items_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    is_coupon_applied boolean NOT NULL,
    coupon_code character varying(50),
    discount_percentage numeric NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    subject character varying(200) NOT NULL,
    message text NOT NULL,
    submitted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    replied boolean DEFAULT false NOT NULL
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- Name: coupons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupons (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    coupon_code character varying(50) NOT NULL,
    validity date,
    discount_percentage numeric NOT NULL,
    is_active boolean NOT NULL
);


ALTER TABLE public.coupons OWNER TO postgres;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id uuid NOT NULL,
    order_id uuid,
    product_id uuid,
    product_name character varying(255) NOT NULL,
    size character varying(50) NOT NULL,
    subcategory character varying(50) NOT NULL,
    quantity integer NOT NULL,
    quantity_price numeric(10,2) NOT NULL,
    price numeric(10,2) NOT NULL,
    status character varying(50) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid NOT NULL,
    user_id uuid,
    total numeric(10,2) NOT NULL,
    coupon_code character varying(50),
    status character varying(50) NOT NULL,
    address_id uuid,
    invoice_url text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: product_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_images (
    id uuid NOT NULL,
    product_id uuid,
    image_url text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.product_images OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    original_price numeric(10,2) NOT NULL,
    discounted_price numeric(10,2) NOT NULL,
    is_active boolean NOT NULL,
    category_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_size; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_size (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid,
    size character varying(50),
    charge numeric(10,2) NOT NULL
);


ALTER TABLE public.products_size OWNER TO postgres;

--
-- Name: products_subcategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_subcategory (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid,
    subcategory character varying(50),
    charge numeric(10,2) NOT NULL
);


ALTER TABLE public.products_subcategory OWNER TO postgres;

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    dirty boolean NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255),
    user_status integer NOT NULL,
    user_role character varying(25) NOT NULL,
    google_id character varying(255),
    profile_picture character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (id, user_id, first_name, last_name, country, street_address, town_city, state, pin_code, mobile_number, email, order_notes, set_as_default, created_at, updated_at) FROM stdin;
d4c85ff9-bef5-47f6-800e-b05b604a2585	fc6053f8-cc74-49fc-9e43-571a8e0ac2c9	NILADRI	ADAK	India	Pownan,Chayani, Ganderpukur	Singur	WEST BENGAL	712409	06290107749	niladri.adak.21@aot.edu.in	\N	t	2024-08-23 11:22:15+00	2024-08-23 11:22:15+00
30526074-e59c-4d68-86ff-271b14c53900	ac6e8720-06f5-4e0c-b9d6-271390d36ef5	Arnab	pal	India	Anandanagar	Singur	West Bengal	712409	6290671716	trivart1@gmail.com	\N	t	2024-08-25 10:27:23+00	2024-08-25 10:27:23+00
73dd88b4-4d82-4544-aaef-73ac834a8397	4d076420-69a0-469a-8ecb-7ebc1fd83091	Abhishek	Santra	India	Anandanagar,Singur , Hooghly	Singur	West Bengal	712409	8420992553	admin@admin.com	\N	t	2024-08-27 11:00:30+00	2024-08-27 11:00:30+00
2d8747ba-29b3-454e-86e9-11229543d543	849741c7-246c-45cd-8d62-dabef3c93ebb	Aakash 	Biswas	India	uttar goara, hatkalna, bardhaman, nibhujibazar,west bengal,713434	Purba Barddhaman	West Bengal	713409	08343898636	akashbiswas@gmail.com	\N	t	2024-08-27 12:57:30+00	2024-08-27 12:57:30+00
6e860d7a-6100-400c-b47d-a53eb64c805a	28c3627a-4a6d-4eb4-b23c-533cc7878035	NILADRI	ADAK	India	Pownan,Chayani, Ganderpukur	Singur	WEST BENGAL	712409	06290107749	niladri.adak.21@aot.edu.in	\N	t	2024-08-27 13:15:28+00	2024-08-27 13:15:28+00
3b8f2c0c-4d7a-466b-ac33-093e5211cc82	6787b574-58ac-4a16-bb96-3d9b40d5c569	Arnab	pal	India	shibtala , singur, hooghly	singur	West Bengal	712409	6290671716	user3@gmail.com	\N	t	2024-08-27 18:40:30+00	2024-08-27 18:40:30+00
69332a83-b4ba-40ff-9611-de474b8c24ca	5c65ef24-44d6-4080-951a-92c938218b8c	arnab	Pal	India	shibtala , singur, hooghly	singur	West Bengal	712409	6290671716	arnab.pal.21@aot.edu.in	\N	t	2024-08-27 18:54:23+00	2024-08-27 18:54:23+00
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, product_id, product_name, product_image, quantity, quantity_price, after_discount_total_price, total_price, product_size_id, product_subcategory_id, size, subcategory, created_at, updated_at) FROM stdin;
8ec8d513-bb65-4ed4-a256-a3597eed7d6a	22ab04ea-50bf-4f18-a579-1b81cd12c599	1105448b-c65a-47e2-bbf5-ec62d9ff6188	test 4	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409890/paintings_image/gktsdlzf4aishkowqkxa.webp	2	1200.00	2800.00	3200.00	6b1e870e-f441-4f94-81c8-978eba42c1b5	0e45e20d-199c-4633-a2c6-48dc91210344	10X20	with frame	2024-08-25 10:27:02.065504+00	2024-08-25 10:27:07.961573+00
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, user_id, is_coupon_applied, coupon_code, discount_percentage, created_at, updated_at) FROM stdin;
8528c6fd-8165-42d9-9cde-b8e9c58fd92d	4dd9c0e2-52b6-41f5-92c6-a0062cd8540d	f		0	2024-08-23 10:33:37.563275+00	2024-08-23 10:33:37.563275+00
ae384900-e3b4-4713-8987-f2df68bee21f	fc6053f8-cc74-49fc-9e43-571a8e0ac2c9	f		0	2024-08-23 11:21:33.016723+00	2024-08-23 11:21:33.016723+00
22ab04ea-50bf-4f18-a579-1b81cd12c599	ac6e8720-06f5-4e0c-b9d6-271390d36ef5	f		0	2024-08-25 10:26:47.393196+00	2024-08-25 10:26:47.393198+00
4c35a54b-a4f3-4a95-b50f-858329c0510c	4d076420-69a0-469a-8ecb-7ebc1fd83091	f		0	2024-08-27 07:03:07.412112+00	2024-08-27 07:03:07.412113+00
a11f9718-170d-4366-ba42-9e71c16b3dc4	849741c7-246c-45cd-8d62-dabef3c93ebb	f		0	2024-08-27 12:56:17.919274+00	2024-08-27 12:56:17.919275+00
e13d5d62-2e04-4144-99d5-bb9e7e820222	28c3627a-4a6d-4eb4-b23c-533cc7878035	f		0	2024-08-27 13:15:00.856703+00	2024-08-27 13:15:00.856704+00
6e99ab58-e199-4b6b-979c-52b4dc91a25d	6787b574-58ac-4a16-bb96-3d9b40d5c569	f		0	2024-08-27 18:39:01.239049+00	2024-08-27 18:39:01.23905+00
b43ef12a-7dcd-46d2-91f5-1ab9ee4f0b4b	5c65ef24-44d6-4080-951a-92c938218b8c	f		0	2024-08-27 18:52:17.519054+00	2024-08-27 18:52:17.519055+00
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description) FROM stdin;
0aa2e3ee-c7b2-49a9-b963-2630540a337f	Talapatra	Also known as palm leaf painting, this ancient and sacred art form from Odisha, India involves treating palm leaves with turmeric, etching stories with an iron tool, and coloring with natural dyes.
f41365cc-e5ee-40b6-90e1-8f93ed57358d	Modern Art	Also known as palm leaf painting, this ancient and sacred art form from Odisha, India involves treating palm leaves with turmeric, etching stories with an iron tool, and coloring with natural dyes.
019737f1-2a3c-4028-b747-356483f7b951	Patachitra	Also known as palm leaf painting, this ancient and sacred art form from Odisha, India involves treating palm leaves with turmeric, etching stories with an iron tool, and coloring with natural dyes.
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (id, first_name, last_name, email, phone, subject, message, submitted_at, replied) FROM stdin;
\.


--
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coupons (id, coupon_code, validity, discount_percentage, is_active) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, product_name, size, subcategory, quantity, quantity_price, price, status, created_at, updated_at) FROM stdin;
cbab4e3b-dd05-498b-8080-523b4f3ef8f3	b08b7f71-d17e-4741-8283-54a5b30ff53a	1105448b-c65a-47e2-bbf5-ec62d9ff6188	test 4	10X20	with frame	3	1200.00	4000.00	pending	2024-08-23 11:22:19.954211+00	2024-08-23 11:22:19.954211+00
a2e98bb9-23aa-4281-a7aa-17f1d4f7ce56	b08b7f71-d17e-4741-8283-54a5b30ff53a	ed86a600-f8a1-446a-b67c-ad15400a7e2c	test 2 	10X20	with frame	1	4500.00	4900.00	pending	2024-08-23 11:22:19.960934+00	2024-08-23 11:22:19.960934+00
9e548317-1bc3-45f5-a85a-32ca1a20e7a6	c5731836-2ccf-41a7-83c7-fa23c996ffb1	d387de94-04e6-4f6c-aeff-3f6302eeedb3	test 5	10X20	with frame	1	2456.00	2856.00	pending	2024-08-27 11:00:37.103001+00	2024-08-27 11:00:37.103003+00
994821ed-ca92-4455-b362-662186fbb50f	230cd427-c05f-4090-ac91-e3836c806422	d387de94-04e6-4f6c-aeff-3f6302eeedb3	test 5	10X20	with frame	2	2456.00	5312.00	pending	2024-08-27 12:57:43.942089+00	2024-08-27 12:57:43.942091+00
e67da2d6-0190-4a95-8d88-7dda9b8fff9e	3c54ac90-8477-4d2b-b004-787ae40ff581	ba789579-1c83-4bbd-8f49-ba7e3d9950fc	test 3	10X20	with frame	1	3300.00	3700.00	delivered	2024-08-27 13:15:40.385936+00	2024-08-27 13:17:30.257585+00
fdf1dfc2-254b-4d2e-b211-b14885667bbc	502a3e53-bfa9-4cca-a4a4-4a5dfaf8b19b	ed86a600-f8a1-446a-b67c-ad15400a7e2c	test 2 	10X20	with frame	1	4500.00	4900.00	pending	2024-08-27 18:41:14.315335+00	2024-08-27 18:41:14.315337+00
bf1501b0-8df0-4e70-a65f-195bc431922a	502a3e53-bfa9-4cca-a4a4-4a5dfaf8b19b	ba789579-1c83-4bbd-8f49-ba7e3d9950fc	test 3	10X20	with frame	1	3300.00	3700.00	pending	2024-08-27 18:41:14.327493+00	2024-08-27 18:41:14.327494+00
e60cf3a5-673f-4d49-b17c-6116e224cfba	89ddb1f8-c98b-4879-8dd2-6ae057017271	ed86a600-f8a1-446a-b67c-ad15400a7e2c	test 2 	10X20	with frame	2	4500.00	9800.00	pending	2024-08-27 18:54:36.53473+00	2024-08-27 18:54:36.534731+00
5518624a-f610-4bab-b29d-0af4fb275a2e	89ddb1f8-c98b-4879-8dd2-6ae057017271	d387de94-04e6-4f6c-aeff-3f6302eeedb3	test 5	10X20	with frame	1	2456.00	2856.00	pending	2024-08-27 18:54:36.546265+00	2024-08-27 18:54:36.546267+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, total, coupon_code, status, address_id, invoice_url, created_at, updated_at) FROM stdin;
b08b7f71-d17e-4741-8283-54a5b30ff53a	fc6053f8-cc74-49fc-9e43-571a8e0ac2c9	5800.00		pending	d4c85ff9-bef5-47f6-800e-b05b604a2585		2024-08-23 11:22:19.94659+00	2024-08-23 11:22:19.946591+00
c5731836-2ccf-41a7-83c7-fa23c996ffb1	4d076420-69a0-469a-8ecb-7ebc1fd83091	2700.00		pending	73dd88b4-4d82-4544-aaef-73ac834a8397		2024-08-27 11:00:37.090408+00	2024-08-27 11:00:37.090409+00
230cd427-c05f-4090-ac91-e3836c806422	849741c7-246c-45cd-8d62-dabef3c93ebb	5000.00		pending	2d8747ba-29b3-454e-86e9-11229543d543		2024-08-27 12:57:43.930632+00	2024-08-27 12:57:43.930633+00
3c54ac90-8477-4d2b-b004-787ae40ff581	28c3627a-4a6d-4eb4-b23c-533cc7878035	3400.00		delivered	6e860d7a-6100-400c-b47d-a53eb64c805a		2024-08-27 13:15:40.374604+00	2024-08-27 13:17:30.257585+00
502a3e53-bfa9-4cca-a4a4-4a5dfaf8b19b	6787b574-58ac-4a16-bb96-3d9b40d5c569	5800.00		pending	3b8f2c0c-4d7a-466b-ac33-093e5211cc82		2024-08-27 18:41:14.302466+00	2024-08-27 18:41:14.302468+00
89ddb1f8-c98b-4879-8dd2-6ae057017271	5c65ef24-44d6-4080-951a-92c938218b8c	7500.00		pending	69332a83-b4ba-40ff-9611-de474b8c24ca		2024-08-27 18:54:36.523612+00	2024-08-27 18:54:36.523614+00
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_images (id, product_id, image_url, created_at) FROM stdin;
3e4dd876-2b85-4b79-8b07-341e1087f5dd	3157661e-c758-4ab0-9bd3-17b13c9d4ae3	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409422/paintings_image/rmqcmai37vlgilvpwxnm.webp	2024-08-23 10:37:02.799819+00
3dc6c1f8-5b47-4dd1-a056-c7e49188621c	3157661e-c758-4ab0-9bd3-17b13c9d4ae3	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409423/paintings_image/b26dqnabqlqs6bmmbwmc.jpg	2024-08-23 10:37:04.195073+00
3c7c5943-1ba9-4923-b2ce-a59c6c81a94c	410043b1-7ad5-4f56-b01a-b6dcbb7c4e89	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409471/paintings_image/epypdgbdogmolwf4ltxg.webp	2024-08-23 10:37:51.964663+00
59683e1f-d58f-46e9-82bc-ee9952864234	410043b1-7ad5-4f56-b01a-b6dcbb7c4e89	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409472/paintings_image/w8fq3b0vshlsjyejd4kk.jpg	2024-08-23 10:37:52.953966+00
e8020c6d-08fa-4305-a13e-3d4bae66c46b	a0b657e1-bdc1-468f-9d1b-11a7109e4cb3	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409516/paintings_image/ke7hsdxy9kyrpcs2bxnl.webp	2024-08-23 10:38:36.77906+00
f4e7d3ed-891d-41fd-9328-d96ca96d65ad	a0b657e1-bdc1-468f-9d1b-11a7109e4cb3	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409517/paintings_image/qysmefczcsdn9n4vjkly.webp	2024-08-23 10:38:38.111255+00
00130ebc-5e0c-4efd-adcc-afb5c46ab9a6	4a07e41d-1853-405b-9170-3252ef973e17	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409673/paintings_image/gkw1ohzlh4mf608ox7ko.webp	2024-08-23 10:41:13.830422+00
fba2037a-94a5-4ace-b2dc-906613b58d7c	4a07e41d-1853-405b-9170-3252ef973e17	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409674/paintings_image/jwpz6upsourct56zg2zc.webp	2024-08-23 10:41:14.955665+00
ff968f3a-5bfa-489c-87e1-cbd3992a2be1	4d4b70ca-e024-4ab9-a1a3-db7709ad92ad	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409721/paintings_image/keoti85wwhm3uzoxp1zs.webp	2024-08-23 10:42:01.63679+00
009e5767-d86c-47c0-a1b5-e3e01b548c2b	4d4b70ca-e024-4ab9-a1a3-db7709ad92ad	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409722/paintings_image/ozdstj1ax5kwi1apql7y.webp	2024-08-23 10:42:02.650229+00
a0f8a135-13fc-4e65-b705-7b55ab059f6f	07f0c893-5190-4b70-bd60-fee6d8446ae1	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409775/paintings_image/a9aipcy5tor1wxlximyn.webp	2024-08-23 10:42:55.917944+00
bf14c88d-9669-4d95-8a3b-53001a0a8092	07f0c893-5190-4b70-bd60-fee6d8446ae1	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409776/paintings_image/eqpsbs7u9qvayupxbb58.jpg	2024-08-23 10:42:57.453516+00
7bd72c4b-4951-45da-b989-91a39f3f572f	ed86a600-f8a1-446a-b67c-ad15400a7e2c	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409811/paintings_image/gyzmaoadlo8iimbat8ap.webp	2024-08-23 10:43:31.65282+00
a82a47cd-7d51-49d5-a7aa-90c48f198a03	ed86a600-f8a1-446a-b67c-ad15400a7e2c	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409812/paintings_image/ioharmygj7ln9yvbd5db.jpg	2024-08-23 10:43:32.882011+00
dd69e904-f461-4bf4-856c-12ff7b5f8b9a	ba789579-1c83-4bbd-8f49-ba7e3d9950fc	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409848/paintings_image/yk8dtacp3l0rd0k8dlhp.webp	2024-08-23 10:44:08.822522+00
43cb4864-c543-4f4b-9c47-0cb1fb46ec34	ba789579-1c83-4bbd-8f49-ba7e3d9950fc	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409849/paintings_image/aihuk5oxwioxvrsmqv09.webp	2024-08-23 10:44:10.256822+00
604386d0-2738-4f54-ac14-c3e3d50268c1	1105448b-c65a-47e2-bbf5-ec62d9ff6188	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409890/paintings_image/gktsdlzf4aishkowqkxa.webp	2024-08-23 10:44:51.419863+00
809b8653-b301-45db-98cd-38fc20a45b02	1105448b-c65a-47e2-bbf5-ec62d9ff6188	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409891/paintings_image/mrfbds8tphnl4rdl7ivh.webp	2024-08-23 10:44:52.441395+00
38e9c8df-8473-45d6-ab72-cb3533641ca2	d387de94-04e6-4f6c-aeff-3f6302eeedb3	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409926/paintings_image/tpzcuno8lv4ohxhrgw4b.webp	2024-08-23 10:45:26.743648+00
1b101fd0-60cd-469f-993d-8cf4b2b7b690	d387de94-04e6-4f6c-aeff-3f6302eeedb3	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409927/paintings_image/z8sdmtuydtqcwqojgk0e.webp	2024-08-23 10:45:27.768511+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, title, description, original_price, discounted_price, is_active, category_id, created_at, updated_at) FROM stdin;
3157661e-c758-4ab0-9bd3-17b13c9d4ae3	test 1 	test 	2300.00	2000.00	t	0aa2e3ee-c7b2-49a9-b963-2630540a337f	2024-08-23 10:36:59.928182+00	2024-08-23 10:36:59.928182+00
410043b1-7ad5-4f56-b01a-b6dcbb7c4e89	test 2	test 	2300.00	1600.00	t	0aa2e3ee-c7b2-49a9-b963-2630540a337f	2024-08-23 10:37:49.881269+00	2024-08-23 10:37:49.881269+00
a0b657e1-bdc1-468f-9d1b-11a7109e4cb3	test 3	test	3400.00	3000.00	t	0aa2e3ee-c7b2-49a9-b963-2630540a337f	2024-08-23 10:38:34.577132+00	2024-08-23 10:38:34.577132+00
4a07e41d-1853-405b-9170-3252ef973e17	test4	test	2400.00	2200.00	t	0aa2e3ee-c7b2-49a9-b963-2630540a337f	2024-08-23 10:41:10.651544+00	2024-08-23 10:41:10.651544+00
4d4b70ca-e024-4ab9-a1a3-db7709ad92ad	test 5	test 	4000.00	3800.00	t	0aa2e3ee-c7b2-49a9-b963-2630540a337f	2024-08-23 10:42:00.388088+00	2024-08-23 10:42:00.388088+00
07f0c893-5190-4b70-bd60-fee6d8446ae1	test1	test	2300.00	1800.00	t	f41365cc-e5ee-40b6-90e1-8f93ed57358d	2024-08-23 10:42:54.707351+00	2024-08-23 10:42:54.707351+00
ed86a600-f8a1-446a-b67c-ad15400a7e2c	test 2 	test	4500.00	2000.00	t	f41365cc-e5ee-40b6-90e1-8f93ed57358d	2024-08-23 10:43:30.327728+00	2024-08-23 10:43:30.327728+00
ba789579-1c83-4bbd-8f49-ba7e3d9950fc	test 3	test 	3300.00	3000.00	t	f41365cc-e5ee-40b6-90e1-8f93ed57358d	2024-08-23 10:44:06.927248+00	2024-08-23 10:44:06.927248+00
1105448b-c65a-47e2-bbf5-ec62d9ff6188	test 4	test	1200.00	1000.00	t	f41365cc-e5ee-40b6-90e1-8f93ed57358d	2024-08-23 10:44:49.78146+00	2024-08-23 10:44:49.78146+00
d387de94-04e6-4f6c-aeff-3f6302eeedb3	test 5	test	2456.00	2300.00	t	f41365cc-e5ee-40b6-90e1-8f93ed57358d	2024-08-23 10:45:24.962885+00	2024-08-23 10:45:24.962885+00
\.


--
-- Data for Name: products_size; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_size (id, product_id, size, charge) FROM stdin;
a45795e4-ea60-4995-bb71-cf625ed8ad7f	3157661e-c758-4ab0-9bd3-17b13c9d4ae3	10X20	200.00
e475460a-2ce1-4228-9f53-b87840ffa0b8	410043b1-7ad5-4f56-b01a-b6dcbb7c4e89	10X20	240.00
46558c08-d8d0-4ee4-b56e-5bbac5fc4190	a0b657e1-bdc1-468f-9d1b-11a7109e4cb3	10X20	200.00
4b1adf80-1ade-4cb5-9f08-cdc3349345e8	4a07e41d-1853-405b-9170-3252ef973e17	10X20	200.00
43d0e606-e855-4f8f-a917-0427ea097837	4d4b70ca-e024-4ab9-a1a3-db7709ad92ad	10X20	200.00
37e32351-747a-4b79-b993-33223f5073b3	07f0c893-5190-4b70-bd60-fee6d8446ae1	10X20	200.00
66003932-3e1a-467c-be9c-e43bf1c915e4	ed86a600-f8a1-446a-b67c-ad15400a7e2c	10X20	200.00
4d61dcd4-6963-4523-8167-d9ec26648a13	ba789579-1c83-4bbd-8f49-ba7e3d9950fc	10X20	200.00
6b1e870e-f441-4f94-81c8-978eba42c1b5	1105448b-c65a-47e2-bbf5-ec62d9ff6188	10X20	200.00
3bd0a7e3-d1be-482b-a8bf-78fd9f780317	d387de94-04e6-4f6c-aeff-3f6302eeedb3	10X20	200.00
\.


--
-- Data for Name: products_subcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_subcategory (id, product_id, subcategory, charge) FROM stdin;
3dacd70b-b2b9-4eb6-b2d7-0914eb0aa00d	3157661e-c758-4ab0-9bd3-17b13c9d4ae3	with frame	200.00
a54650e9-0211-4016-89ca-39663d2120b5	410043b1-7ad5-4f56-b01a-b6dcbb7c4e89	with frame	200.00
9fc90480-08d4-4cb5-9706-89ebffa5d30b	a0b657e1-bdc1-468f-9d1b-11a7109e4cb3	with frame 	200.00
e6003d85-5d52-4478-ba65-7fc42984830a	4a07e41d-1853-405b-9170-3252ef973e17	with frame	200.00
a2888fb0-93c1-4cf3-b89f-671aed1e7b66	4d4b70ca-e024-4ab9-a1a3-db7709ad92ad	with frame	200.00
7eeb2ccb-ab7c-4ff6-bbc2-1b8915843796	07f0c893-5190-4b70-bd60-fee6d8446ae1	with frame	200.00
0660b1ef-a9ff-4513-b108-03d6722a42a9	ed86a600-f8a1-446a-b67c-ad15400a7e2c	with frame	200.00
900544ea-dc93-423b-8f6b-fd3bb82ae152	ba789579-1c83-4bbd-8f49-ba7e3d9950fc	with frame	200.00
0e45e20d-199c-4633-a2c6-48dc91210344	1105448b-c65a-47e2-bbf5-ec62d9ff6188	with frame	200.00
a1defac8-4647-4441-90ed-49fba6a0a892	d387de94-04e6-4f6c-aeff-3f6302eeedb3	with frame	200.00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schema_migrations (version, dirty) FROM stdin;
1	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, updated_at, first_name, last_name, email, password_hash, user_status, user_role, google_id, profile_picture) FROM stdin;
4dd9c0e2-52b6-41f5-92c6-a0062cd8540d	2024-08-23 10:33:37.55323+00	0001-01-01 00:00:00+00	Niladri	Adak	admin@admin.com	$2a$04$lOvOBNteg1ZzgOk63XC4wOQxAEijoK58.u4imVAsTkpgdpx/6WADe	1	admin	\N	\N
fc6053f8-cc74-49fc-9e43-571a8e0ac2c9	2024-08-23 11:21:33.01017+00	0001-01-01 00:00:00+00	NILADRI	ADAK	niladri.adak.21@aot.edu.in	$2a$04$1lWmf1CA9rlRiok6ARL9r.bbvc1fJPh4mpEN8quK.1N6I8pUGYfcu	1	user	\N	\N
ac6e8720-06f5-4e0c-b9d6-271390d36ef5	2024-08-25 10:26:47.376911+00	0001-01-01 00:00:00+00	trivart	painting	trivart1@gmail.com	$2a$04$eTe0AiMn/em3.t/fvjYZd.PRU9EbuMZc0/xi0GLmt5EcikYMtXNb6	1	user	\N	\N
4d076420-69a0-469a-8ecb-7ebc1fd83091	2024-08-27 07:03:07.40085+00	0001-01-01 00:00:00+00	Abhishek	Santra	abhisheksantra28@gmail.com	$2a$04$YY4BrjWghiQsz3ScnllZa.qpTXbULIuYCwdU8.N9et5sN9FAAjVv.	1	user	\N	\N
849741c7-246c-45cd-8d62-dabef3c93ebb	2024-08-27 12:56:17.908768+00	0001-01-01 00:00:00+00	Akash	Biswas	akashbiswas2005@gmail.com	$2a$04$t8ZfVqCISzcpwX.3B68Yr.FX2luaE3rXHfxXmjz3piOKXG9daKriq	1	user	\N	\N
28c3627a-4a6d-4eb4-b23c-533cc7878035	2024-08-27 13:15:00.844612+00	0001-01-01 00:00:00+00	Arpan	Adak	arpan.adak2003@gmail.com	$2a$04$nMm0nnwBLkc1s/.0RaLfEea2VEn0smDXprKQbhyhskhW.p1CLJn.W	1	user	\N	\N
6787b574-58ac-4a16-bb96-3d9b40d5c569	2024-08-27 18:39:01.227724+00	0001-01-01 00:00:00+00	Arnab	Pal	jecadeg490@amxyy.com	$2a$04$V3ueyNW9Zsw/d2JLJ8/gG.pVkxGtFGeTjSOV3pkGhWGxg9FtDpdLK	1	user	\N	\N
5c65ef24-44d6-4080-951a-92c938218b8c	2024-08-27 18:52:17.50846+00	0001-01-01 00:00:00+00	Arnab	Pal	arnab.pal712409@gmail.com	$2a$04$DgIdkETro1d/ANGKW/gA6.FYc6F4.zLmtfmykDBzVpxD3WkrqzhDO	1	user	\N	\N
\.


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: coupons coupons_coupon_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_coupon_code_key UNIQUE (coupon_code);


--
-- Name: coupons coupons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products_size products_size_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_size
    ADD CONSTRAINT products_size_pkey PRIMARY KEY (id);


--
-- Name: products_subcategory products_subcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_subcategory
    ADD CONSTRAINT products_subcategory_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: addresses addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;


--
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- Name: orders orders_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id) ON DELETE SET NULL;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: product_images product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: products_size products_size_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_size
    ADD CONSTRAINT products_size_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_subcategory products_subcategory_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_subcategory
    ADD CONSTRAINT products_subcategory_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

