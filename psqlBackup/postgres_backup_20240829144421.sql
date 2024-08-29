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
    product_image text NOT NULL,
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
4aed3475-1ab0-4e33-8317-865d84d88046	07f9985c-c5ac-4d69-aebb-02e17325aead	arnab	pal	India	shibtala , singur, hooghly	singur	West Bengal	712409	6290671716	arnabpal@gov.in	\N	t	2024-08-29 14:25:23+00	2024-08-29 14:25:23+00
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, product_id, product_name, product_image, quantity, quantity_price, after_discount_total_price, total_price, product_size_id, product_subcategory_id, size, subcategory, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, user_id, is_coupon_applied, coupon_code, discount_percentage, created_at, updated_at) FROM stdin;
cc158810-016d-49c1-93c9-3d2c2f16455e	564c6df6-59a5-4f23-85e6-a9842f37e7ae	f		0	2024-08-29 14:04:47.209993+00	2024-08-29 14:04:47.209995+00
ed9510d2-5877-4a9f-a8ae-3f262f7ff553	07f9985c-c5ac-4d69-aebb-02e17325aead	f		0	2024-08-29 14:24:15.172121+00	2024-08-29 14:24:15.172123+00
e4ed7a03-ea82-4227-8d40-fd722e05bdcc	8cd9eaa7-dfd1-42be-af4d-b6e21ab20167	f		0	2024-08-29 14:44:17.337639+00	2024-08-29 14:44:17.337641+00
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description) FROM stdin;
25b5def8-8a83-49de-9ba0-8b5f31113dc7	Modern Art	Also known as palm leaf painting, this ancient and sacred art form from Odisha, India involves treating palm leaves with turmeric, etching stories with an iron tool, and coloring with natural dyes.
c6180d99-a689-4ea7-a25d-a7c3b1129058	Talapatra	Also known as palm leaf painting, this ancient and sacred art form from Odisha, India involves treating palm leaves with turmeric, etching stories with an iron tool, and coloring with natural dyes.
9b54bc53-9d1d-4e6f-9fb7-2a92090f5d61	Patachitra	Also known as palm leaf painting, this ancient and sacred art form from Odisha, India involves treating palm leaves with turmeric, etching stories with an iron tool, and coloring with natural dyes.
44a34fc2-12ae-4bf8-a94a-b835486088dc	Tribal Art	Also known as palm leaf painting, this ancient and sacred art form from Odisha, India involves treating palm leaves with turmeric, etching stories with an iron tool, and coloring with natural dyes.
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

COPY public.order_items (id, order_id, product_id, product_name, product_image, size, subcategory, quantity, quantity_price, price, status, created_at, updated_at) FROM stdin;
9e1fcdbf-8435-4429-a0df-631ec498244b	3478307a-19d4-4b06-a292-f34449542f8e	b68fcfa3-ad90-491b-af53-fe77dff59974	Krishna Painting	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940434/paintings_image/dmvfdv18bm2xmvyzh5t4.jpg	Small	Glass	1	4556.00	4906.00	shipped	2024-08-29 14:25:37.981392+00	2024-08-29 14:30:44.720017+00
00822f83-c085-4f56-b85e-7c70160ab40a	3478307a-19d4-4b06-a292-f34449542f8e	efebfe5c-ecc3-492e-9454-c7694b4425bb	Ganesha Painting	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940591/paintings_image/reufkze82frzkmvvkvil.webp	Medium	With Glass	1	3678.00	4118.00	shipped	2024-08-29 14:25:37.994003+00	2024-08-29 14:30:44.720017+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, total, coupon_code, status, address_id, invoice_url, created_at, updated_at) FROM stdin;
3478307a-19d4-4b06-a292-f34449542f8e	07f9985c-c5ac-4d69-aebb-02e17325aead	8590.00		shipped	4aed3475-1ab0-4e33-8317-865d84d88046		2024-08-29 14:25:37.969517+00	2024-08-29 14:30:44.720017+00
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_images (id, product_id, image_url, created_at) FROM stdin;
b87f406e-41ab-4bc7-a763-1a6a57ebd7d2	b68fcfa3-ad90-491b-af53-fe77dff59974	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940434/paintings_image/dmvfdv18bm2xmvyzh5t4.jpg	2024-08-29 14:07:14.625362+00
92b19e46-acba-471f-950a-3c5b1725ff07	b68fcfa3-ad90-491b-af53-fe77dff59974	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940435/paintings_image/hzvvdhgdkcagns5o41tw.webp	2024-08-29 14:07:15.623155+00
bb433413-c893-488d-906e-73554ee637cd	192a949e-2fca-4bc6-a0a9-d9a93cd4d311	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940513/paintings_image/uqovhgzzfjaj4j3jv8uy.jpg	2024-08-29 14:08:34.07863+00
bde14d8d-eb14-45da-9fb3-fa1d8cc4c5fc	192a949e-2fca-4bc6-a0a9-d9a93cd4d311	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940514/paintings_image/jtkukgc70k2kzy0gydcf.webp	2024-08-29 14:08:35.653961+00
17017132-e0ac-413b-bdf3-ca76d0968a71	efebfe5c-ecc3-492e-9454-c7694b4425bb	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940591/paintings_image/reufkze82frzkmvvkvil.webp	2024-08-29 14:09:52.539145+00
961792b4-a9ed-4b04-9c0a-5ed409c56c56	efebfe5c-ecc3-492e-9454-c7694b4425bb	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940592/paintings_image/kzmuyiauztzljcq4zbgn.webp	2024-08-29 14:09:53.390374+00
ea49f84f-3cfc-46cb-b12e-b324c6cb99ec	1adf5a1e-9959-4dcd-9084-6e43fc1f18dc	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940664/paintings_image/vt8qmtecjh63r4wxvkll.webp	2024-08-29 14:11:04.833227+00
8fda771c-7325-4425-93e3-f474626fe46e	1adf5a1e-9959-4dcd-9084-6e43fc1f18dc	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940665/paintings_image/msoc7hwgbuclhwpd5s1x.webp	2024-08-29 14:11:05.746246+00
79b4e521-2a1b-45fb-acb8-1f85115aeb7d	08763c53-7da5-4565-bba8-b8d04e0f55a0	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940768/paintings_image/gnqec1qri7c87zabfbic.webp	2024-08-29 14:12:49.120899+00
192a8394-d7eb-46c3-a2d5-da19170672c5	08763c53-7da5-4565-bba8-b8d04e0f55a0	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940769/paintings_image/fmxxmpxzhdqg2cvb0rth.webp	2024-08-29 14:12:50.223332+00
798d5892-1054-413c-b096-c7fc72ae7c71	7ce5a882-5414-4eae-abf8-d13116a3160b	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940957/paintings_image/aykm5zzielzwmiabxpca.webp	2024-08-29 14:15:58.007711+00
fff12e46-81e5-4e9d-82cf-89d6af4cf7da	7ce5a882-5414-4eae-abf8-d13116a3160b	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940958/paintings_image/j3rm56nsuvomdcu1uoke.webp	2024-08-29 14:15:58.892867+00
d0482201-9cb7-480d-bc30-c1dae2afcfab	60d2b338-e8c8-4de5-86d5-9be9ed32cd14	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941056/paintings_image/hkynfs2ibxpdq9srgk8b.webp	2024-08-29 14:17:36.963333+00
a9a79e31-8e31-4f0f-9d1b-5b0a798bce58	60d2b338-e8c8-4de5-86d5-9be9ed32cd14	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941057/paintings_image/szvdaqa3znn3zusrrn7i.webp	2024-08-29 14:17:38.088059+00
2f81d668-d6e0-4921-bcd7-e0b5c318d7ea	59e5f629-8dec-438c-9d2f-9a3807c7b459	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941127/paintings_image/dnbrhqetse14sbykrvpj.webp	2024-08-29 14:18:47.717496+00
360bf995-1022-4832-a032-88ef78dc9131	59e5f629-8dec-438c-9d2f-9a3807c7b459	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941128/paintings_image/vroioroq6qrammnwxu3a.webp	2024-08-29 14:18:48.940713+00
188070c0-b99c-48ab-af9a-23b024e84472	3a59da93-36ee-4d13-8088-f61f71adb9a7	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941228/paintings_image/gpbenqez6oubdzgu0z1e.webp	2024-08-29 14:20:29.063685+00
acd2e1f8-c7cc-4afc-bfb6-e9f9b7f50fd8	3a59da93-36ee-4d13-8088-f61f71adb9a7	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941229/paintings_image/psxabo1qcfvafwsxlxxm.webp	2024-08-29 14:20:30.025453+00
573e7737-aba6-4d0b-bb44-c49c2f4a5412	70577fb5-1764-48ce-8caf-2db20701a964	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941334/paintings_image/kgypd2ryxkqdbb0d1e6y.webp	2024-08-29 14:22:15.38034+00
d27b0c45-faf5-40e3-9e44-497b7b192741	70577fb5-1764-48ce-8caf-2db20701a964	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941335/paintings_image/kqj3abvkbnqcas4ichux.webp	2024-08-29 14:22:16.310363+00
ba8542b3-1281-482c-ae19-b69bf8775087	6554bbfd-811d-4284-b6e0-4ab03d29d4eb	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941454/paintings_image/idde5mbvk7pvwtgudbxi.png	2024-08-29 14:24:15.568282+00
beaf4596-4f28-43c3-a40d-47ccccebf2b2	6554bbfd-811d-4284-b6e0-4ab03d29d4eb	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941456/paintings_image/wvpszqhz5ccetshqfy6s.png	2024-08-29 14:24:16.803138+00
97865bed-7d04-48d5-b243-fd466a70e0ab	d63f5ce2-523e-476d-ac2d-a1a7785d6b39	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941536/paintings_image/yk4kasfuxw390r61cndb.png	2024-08-29 14:25:37.195423+00
986209ac-da9d-46db-9410-bf7d43bea794	d63f5ce2-523e-476d-ac2d-a1a7785d6b39	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941537/paintings_image/xintzvtoi4cookb3oauq.png	2024-08-29 14:25:38.154595+00
79871438-9914-424a-bf24-281e0ed4d463	16370af0-be47-43e4-9e44-7aa6237680ed	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941635/paintings_image/cxm4cuq9fdwyqlz2ipkq.png	2024-08-29 14:27:15.532045+00
a4b1e5a9-1e7a-40b6-bfd2-9541a7899f1b	16370af0-be47-43e4-9e44-7aa6237680ed	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941636/paintings_image/pz5en7fnandijdmar8c9.png	2024-08-29 14:27:17.163506+00
9edba3b8-1a9e-4463-9d0b-e48b70dd1643	804fe5dc-9171-4314-83c2-5c02c00e608c	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941733/paintings_image/srt58fu8d2eus9mnpaix.png	2024-08-29 14:28:53.840295+00
9c29fc81-f805-4299-a242-5850ec89378c	804fe5dc-9171-4314-83c2-5c02c00e608c	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941734/paintings_image/pk71tbkyujfga775fknz.png	2024-08-29 14:28:55.314483+00
a9351b09-56f7-4fa3-938b-07aac2551dee	c7364869-236a-4587-a954-82ca7a2df015	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941835/paintings_image/heree8y85khehcw61tah.png	2024-08-29 14:30:35.900896+00
518f0c92-f29c-4ba2-91d4-fd96094d4d21	c7364869-236a-4587-a954-82ca7a2df015	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724941836/paintings_image/eknqbxblgqpnuipmhp0u.png	2024-08-29 14:30:36.726715+00
6191a437-d4e8-471d-afc9-6bb3b8572323	fd459162-3643-4975-87e9-443c7c95e478	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724942304/paintings_image/wbxh8ntba7ccjmqwnbvh.png	2024-08-29 14:38:24.637932+00
acc8bf66-0fed-43d8-b930-c5d70b793357	fd459162-3643-4975-87e9-443c7c95e478	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724942305/paintings_image/p9jnlajaeif6zruzbkut.webp	2024-08-29 14:38:25.869085+00
2893328f-bf08-401f-9c53-beec39fda9d0	5562d724-ad1d-4591-b67e-72d60fb94a86	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724942474/paintings_image/sbnriem4bk9viedqjaua.png	2024-08-29 14:41:14.80328+00
1ace97d1-8b2e-44a0-8326-93b58ba08709	5562d724-ad1d-4591-b67e-72d60fb94a86	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724942474/paintings_image/je2wqiysxvfvkfzmcswr.png	2024-08-29 14:41:15.388805+00
3090a764-655a-42b3-84d9-df52c66df5b1	b1d5ff1a-fbc7-47ec-9c05-4d00118d341d	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724942589/paintings_image/ht6qwdf9pc92pcxpcls2.png	2024-08-29 14:43:10.368586+00
95a6975f-af92-41ac-bc1d-e9a7a5358e6e	b1d5ff1a-fbc7-47ec-9c05-4d00118d341d	https://res.cloudinary.com/doqoyoxxp/image/upload/v1724942590/paintings_image/nkmwcnf20mq7b09gwlgi.png	2024-08-29 14:43:11.207643+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, title, description, original_price, discounted_price, is_active, category_id, created_at, updated_at) FROM stdin;
b68fcfa3-ad90-491b-af53-fe77dff59974	Krishna Painting	Tree of life implies “peace and comfort”. It connects earth to heavens. Apart from being a good source of wall decor, it is one of the recommended vastu remedies product for our home.	4556.00	4400.00	t	9b54bc53-9d1d-4e6f-9fb7-2a92090f5d61	2024-08-29 14:07:12.599219+00	2024-08-29 14:07:12.59922+00
192a949e-2fca-4bc6-a0a9-d9a93cd4d311	Buddha Painting	Tree of life implies “peace and comfort”. It connects earth to heavens. Apart from being a good source of wall decor, it is one of the recommended vastu remedies product for our home.	4300.00	4000.00	t	9b54bc53-9d1d-4e6f-9fb7-2a92090f5d61	2024-08-29 14:08:32.727054+00	2024-08-29 14:08:32.727055+00
efebfe5c-ecc3-492e-9454-c7694b4425bb	Ganesha Painting	Tree of life implies “peace and comfort”. It connects earth to heavens. Apart from being a good source of wall decor, it is one of the recommended vastu remedies product for our home.	3678.00	3400.00	t	9b54bc53-9d1d-4e6f-9fb7-2a92090f5d61	2024-08-29 14:09:51.180575+00	2024-08-29 14:09:51.180576+00
1adf5a1e-9959-4dcd-9084-6e43fc1f18dc	Decor Painting	Tree of life implies “peace and comfort”. It connects earth to heavens. Apart from being a good source of wall decor, it is one of the recommended vastu remedies product for our home.	3456.00	3000.00	t	9b54bc53-9d1d-4e6f-9fb7-2a92090f5d61	2024-08-29 14:11:03.477741+00	2024-08-29 14:11:03.477742+00
08763c53-7da5-4565-bba8-b8d04e0f55a0	Trees Life	Tree of life implies “peace and comfort”. It connects earth to heavens. Apart from being a good source of wall decor, it is one of the recommended vastu remedies product for our home.	2340.00	2004.00	t	9b54bc53-9d1d-4e6f-9fb7-2a92090f5d61	2024-08-29 14:12:47.180984+00	2024-08-29 14:12:47.180985+00
7ce5a882-5414-4eae-abf8-d13116a3160b	Radha Krishna 	The art goes back to the time when there was no Pen or Paper and people recorded everything on palm leaves. The history of writing in India found its true meaning in Palm Leaves. Many tales and epics like Ramayana, Mahabharata, Krishna Leela were originally registered on palm leaves and were passed on for Generations.	4695.00	4400.00	t	c6180d99-a689-4ea7-a25d-a7c3b1129058	2024-08-29 14:15:55.903998+00	2024-08-29 14:15:55.903999+00
60d2b338-e8c8-4de5-86d5-9be9ed32cd14	Nartaka Ganesha	The art goes back to the time when there was no Pen or Paper and people recorded everything on palm leaves. The history of writing in India found its true meaning in Palm Leaves. Many tales and epics like Ramayana, Mahabharata, Krishna Leela were originally registered on palm leaves and were passed on for Generations.	4500.00	4300.00	t	c6180d99-a689-4ea7-a25d-a7c3b1129058	2024-08-29 14:17:34.839464+00	2024-08-29 14:17:34.839465+00
59e5f629-8dec-438c-9d2f-9a3807c7b459	Nartaka Gopal	The art goes back to the time when there was no Pen or Paper and people recorded everything on palm leaves. The history of writing in India found its true meaning in Palm Leaves. Many tales and epics like Ramayana, Mahabharata, Krishna Leela were originally registered on palm leaves and were passed on for Generations.	3400.00	3200.00	t	c6180d99-a689-4ea7-a25d-a7c3b1129058	2024-08-29 14:18:46.205+00	2024-08-29 14:18:46.205001+00
3a59da93-36ee-4d13-8088-f61f71adb9a7	Jagannath Dhayana	The art goes back to the time when there was no Pen or Paper and people recorded everything on palm leaves. The history of writing in India found its true meaning in Palm Leaves. Many tales and epics like Ramayana, Mahabharata, Krishna Leela were originally registered on palm leaves and were passed on for Generations.	3450.00	3100.00	t	c6180d99-a689-4ea7-a25d-a7c3b1129058	2024-08-29 14:20:26.965016+00	2024-08-29 14:20:26.965017+00
70577fb5-1764-48ce-8caf-2db20701a964	Basuri Krishna	The art goes back to the time when there was no Pen or Paper and people recorded everything on palm leaves. The history of writing in India found its true meaning in Palm Leaves. Many tales and epics like Ramayana, Mahabharata, Krishna Leela were originally registered on palm leaves and were passed on for Generations.	3600.00	3100.00	t	c6180d99-a689-4ea7-a25d-a7c3b1129058	2024-08-29 14:22:13.375856+00	2024-08-29 14:22:13.375857+00
6554bbfd-811d-4284-b6e0-4ab03d29d4eb	Lost Laces	The art goes back to the time when there was no Pen or Paper and people recorded everything on palm leaves. The history of writing in India found its true meaning in Palm Leaves. Many tales and epics like Ramayana, Mahabharata, Krishna Leela were originally registered on palm leaves and were passed on for Generations.	2340.00	2000.00	t	25b5def8-8a83-49de-9ba0-8b5f31113dc7	2024-08-29 14:24:13.261759+00	2024-08-29 14:24:13.26176+00
d63f5ce2-523e-476d-ac2d-a1a7785d6b39	Just in Time	The art goes back to the time when there was no Pen or Paper and people recorded everything on palm leaves. The history of writing in India found its true meaning in Palm Leaves. Many tales and epics like Ramayana, Mahabharata, Krishna Leela were originally registered on palm leaves and were passed on for Generations.	3560.00	3245.00	t	25b5def8-8a83-49de-9ba0-8b5f31113dc7	2024-08-29 14:25:35.47163+00	2024-08-29 14:25:35.471631+00
16370af0-be47-43e4-9e44-7aa6237680ed	Quiet Voyage	Since 2011, we here at The Modern Art Shop have been passionate about creating artwork with great color and bold, abstract design. Every piece from The Modern Art Shop is individually crafted to order with love and care utilizing the finest materials.	4800.00	4500.00	t	25b5def8-8a83-49de-9ba0-8b5f31113dc7	2024-08-29 14:27:13.937982+00	2024-08-29 14:27:13.937984+00
804fe5dc-9171-4314-83c2-5c02c00e608c	Lets Dance	Since 2011, we here at The Modern Art Shop have been passionate about creating artwork with great color and bold, abstract design. Every piece from The Modern Art Shop is individually crafted to order with love and care utilizing the finest materials.	3420.00	3100.00	t	25b5def8-8a83-49de-9ba0-8b5f31113dc7	2024-08-29 14:28:51.236091+00	2024-08-29 14:28:51.236092+00
c7364869-236a-4587-a954-82ca7a2df015	Three Squares	Since 2011, we here at The Modern Art Shop have been passionate about creating artwork with great color and bold, abstract design. Every piece from The Modern Art Shop is individually crafted to order with love and care utilizing the finest materials.	4700.00	4300.00	t	25b5def8-8a83-49de-9ba0-8b5f31113dc7	2024-08-29 14:30:33.761714+00	2024-08-29 14:30:33.761715+00
fd459162-3643-4975-87e9-443c7c95e478	Madhubani Painting “God Sun”	Madhubani art, originating from Bihar, India, is famous for its striking colors, elaborate patterns, and depictions of natural elements, religious motifs, and common occurrences.	4599.00	4200.00	t	44a34fc2-12ae-4bf8-a94a-b835486088dc	2024-08-29 14:38:22.469377+00	2024-08-29 14:38:22.469378+00
5562d724-ad1d-4591-b67e-72d60fb94a86	Gond Tribal Painting :”Cow & Calf”	Beautiful Gond style of painting by Cow & Calf, showing the cow’s maternity. Created on paper with acrylic color by experienced  & talent Reeta Shyam.	2300.00	2100.00	t	44a34fc2-12ae-4bf8-a94a-b835486088dc	2024-08-29 14:41:12.235267+00	2024-08-29 14:41:12.235268+00
b1d5ff1a-fbc7-47ec-9c05-4d00118d341d	Gond Painting :Birds on a tree	This beautiful Gond painting is made in acrylic paint on paper. Artist Naresh has presented beautiful five tree singing on a colorful tree	2300.00	1000.00	t	44a34fc2-12ae-4bf8-a94a-b835486088dc	2024-08-29 14:43:08.140825+00	2024-08-29 14:43:08.140826+00
\.


--
-- Data for Name: products_size; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_size (id, product_id, size, charge) FROM stdin;
e8b4f563-6743-42be-a025-9d05f8efc4ff	b68fcfa3-ad90-491b-af53-fe77dff59974	Large	300.00
7f5b613b-7a6f-4e0b-8ce2-9d29d55eef6c	b68fcfa3-ad90-491b-af53-fe77dff59974	Medium	200.00
72dc43d5-e3b8-4f89-acd9-04bf37eab6a9	b68fcfa3-ad90-491b-af53-fe77dff59974	Small	100.00
122f9c88-7df7-4e74-a545-c5f9396acc8b	192a949e-2fca-4bc6-a0a9-d9a93cd4d311	Large	300.00
4ec9818d-e045-4cfb-803c-ca919d61efdc	192a949e-2fca-4bc6-a0a9-d9a93cd4d311	Medium	200.00
b258342c-5ffa-4dc8-a120-db202a392ef8	192a949e-2fca-4bc6-a0a9-d9a93cd4d311	Small	100.00
69ad7ef9-87e6-4588-8b7a-c17e2fb2edba	efebfe5c-ecc3-492e-9454-c7694b4425bb	Large	300.00
260fd474-994d-4ac3-95fb-e3e57ac085a0	efebfe5c-ecc3-492e-9454-c7694b4425bb	Medium	200.00
29536f05-9d46-4309-ace7-35e18d1023f9	efebfe5c-ecc3-492e-9454-c7694b4425bb	Small	100.00
2fe27fdb-0205-4e40-9d1b-13d42e8e604a	1adf5a1e-9959-4dcd-9084-6e43fc1f18dc	Large	200.00
b8f58b02-4663-4351-9b49-27a0e794d2dc	1adf5a1e-9959-4dcd-9084-6e43fc1f18dc	Medium	150.00
e5911907-eff3-473e-a36e-6dd4b4705841	1adf5a1e-9959-4dcd-9084-6e43fc1f18dc	Small	100.00
a1c629b5-8af9-4cee-a276-616b67dd99c2	08763c53-7da5-4565-bba8-b8d04e0f55a0	Large	200.00
7d0c4b9f-f5b9-49c4-ba64-61a6fb4d11aa	08763c53-7da5-4565-bba8-b8d04e0f55a0	Medium	150.00
c7c0d33e-8c05-4860-b014-b17cadeac364	08763c53-7da5-4565-bba8-b8d04e0f55a0	Small	100.00
95cfca5f-b930-4726-ac65-1fee7dc1b6a8	7ce5a882-5414-4eae-abf8-d13116a3160b	Large	250.00
cc87fee7-714d-4e22-af04-3c09164eafa3	7ce5a882-5414-4eae-abf8-d13116a3160b	Medium	200.00
647bf209-6f94-48f8-9385-2ed2067fe0cb	7ce5a882-5414-4eae-abf8-d13116a3160b	Small	150.00
e0e91af9-2701-4d23-99b0-508f36c81cee	60d2b338-e8c8-4de5-86d5-9be9ed32cd14	Large	250.00
d9e06612-7903-4597-89d6-5a2a684b715d	60d2b338-e8c8-4de5-86d5-9be9ed32cd14	Medium	150.00
bf688a01-8a7e-436a-a274-6b1d613a0da6	60d2b338-e8c8-4de5-86d5-9be9ed32cd14	Small	100.00
6bcb7963-86ea-4486-a101-35f048ecda8b	59e5f629-8dec-438c-9d2f-9a3807c7b459	Large	200.00
0a31de0e-7985-4f61-9085-ee7d827880fb	59e5f629-8dec-438c-9d2f-9a3807c7b459	Medium	150.00
5d3246cb-261c-4912-b461-c8daf8e6901d	59e5f629-8dec-438c-9d2f-9a3807c7b459	Small	100.00
cf017c2f-3fbf-47ff-be12-2b73a9f782d1	70577fb5-1764-48ce-8caf-2db20701a964	Large	250.00
0aa33dae-0ebc-441c-8c35-bd0b4e4a1b25	70577fb5-1764-48ce-8caf-2db20701a964	Medium	200.00
5d9c0adc-72b5-4660-aa8b-248916be4c80	70577fb5-1764-48ce-8caf-2db20701a964	Small	100.00
dd54157a-8efc-4fd2-ac9a-2b68bc68e847	6554bbfd-811d-4284-b6e0-4ab03d29d4eb	Large	250.00
8e79b305-666d-4492-b44c-7c21026e52c3	6554bbfd-811d-4284-b6e0-4ab03d29d4eb	Medium	200.00
96848c62-7841-45c7-9fc9-4f7e6d9a80da	6554bbfd-811d-4284-b6e0-4ab03d29d4eb	Small	100.00
59f5c56a-3728-4981-8967-9b687f143cb7	d63f5ce2-523e-476d-ac2d-a1a7785d6b39	Large	150.00
4282b3e6-57bc-4923-b108-21bf72c61272	d63f5ce2-523e-476d-ac2d-a1a7785d6b39	Medium	100.00
39e91f00-305a-4b9b-8a98-4f4dfc93b2de	d63f5ce2-523e-476d-ac2d-a1a7785d6b39	Small	80.00
29648de1-aeaf-4ce8-8fbf-e84702c92cfc	16370af0-be47-43e4-9e44-7aa6237680ed	Large	250.00
386db84d-09f9-4117-9565-a05840e931a5	16370af0-be47-43e4-9e44-7aa6237680ed	Small	200.00
a9b3ed28-c0f3-4715-9ab1-35f87bfbf310	16370af0-be47-43e4-9e44-7aa6237680ed	Medium	100.00
3c53090e-1243-4eb4-951c-213f0d008616	804fe5dc-9171-4314-83c2-5c02c00e608c	Large	100.00
cd6a8d24-a809-4939-ad9d-df66b0fae92a	804fe5dc-9171-4314-83c2-5c02c00e608c	Medium	150.00
64a8f76b-f584-49c2-b0bd-93ff9ea95bdc	804fe5dc-9171-4314-83c2-5c02c00e608c	Small	90.00
da171d4b-1440-490c-bc30-0bc7767b18ce	c7364869-236a-4587-a954-82ca7a2df015	Large	230.00
c9dc2728-9912-4ddf-82cf-1798cb188e30	c7364869-236a-4587-a954-82ca7a2df015	Medium	200.00
1fa6120f-da8a-4e16-9278-c5dc3661bd3d	c7364869-236a-4587-a954-82ca7a2df015	Small	100.00
ef6f3951-d211-430b-a785-aa481e69c765	fd459162-3643-4975-87e9-443c7c95e478	Large	250.00
2801ae84-712c-4fa7-8281-4e1d8c62c7b9	fd459162-3643-4975-87e9-443c7c95e478	Medium	200.00
007f0da0-448f-422a-8026-7ec51526100a	fd459162-3643-4975-87e9-443c7c95e478	Small	100.00
c1b9a6ed-c025-4ea5-b964-79fd67ad0b7b	5562d724-ad1d-4591-b67e-72d60fb94a86	Large	200.00
74e79280-e93a-4387-adb1-d37d05577bc9	5562d724-ad1d-4591-b67e-72d60fb94a86	Small	150.00
d50e471d-0d01-4c75-8e16-ddce8bd116d2	5562d724-ad1d-4591-b67e-72d60fb94a86	Medium	100.00
312da460-928d-4ab5-91cd-8ab181262381	b1d5ff1a-fbc7-47ec-9c05-4d00118d341d	Large	230.00
598547d8-97d8-4e8b-8f3b-859709806317	b1d5ff1a-fbc7-47ec-9c05-4d00118d341d	Medium	120.00
35607bce-a184-4326-ab49-06cb607a0d41	b1d5ff1a-fbc7-47ec-9c05-4d00118d341d	Small	200.00
\.


--
-- Data for Name: products_subcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_subcategory (id, product_id, subcategory, charge) FROM stdin;
09ac0ae3-6bcc-4eea-b41e-a172ddf4ad7d	b68fcfa3-ad90-491b-af53-fe77dff59974	With Frame	200.00
c1decd19-bb31-4352-a835-1c503eb98590	b68fcfa3-ad90-491b-af53-fe77dff59974	Glass	250.00
525c78dd-76a3-4931-a2f4-6c4880d8e2a5	192a949e-2fca-4bc6-a0a9-d9a93cd4d311	With Frame	200.00
4e366be6-6aec-45de-9148-e285cd2f3c5f	192a949e-2fca-4bc6-a0a9-d9a93cd4d311	With Glass	250.00
de805fd4-6f24-4fa8-a0f3-501a0780047f	efebfe5c-ecc3-492e-9454-c7694b4425bb	With frame	250.00
03395242-a7d2-40b3-887c-70f71d743650	efebfe5c-ecc3-492e-9454-c7694b4425bb	With Glass	240.00
95e2f919-9f6e-490b-8465-70c031e1a082	1adf5a1e-9959-4dcd-9084-6e43fc1f18dc	With Frame	200.00
a2c70034-bee3-4258-848a-2067c5a0b20d	1adf5a1e-9959-4dcd-9084-6e43fc1f18dc	With Glass	234.00
d16c014a-c2e1-4a14-b719-7cd362dd4239	08763c53-7da5-4565-bba8-b8d04e0f55a0	With Frame	250.00
34115e17-abd1-4d70-a33f-0d45c8b9d926	08763c53-7da5-4565-bba8-b8d04e0f55a0	With Glass	200.00
495b3f90-3d1f-4d2b-aaf5-61c87b98b26f	7ce5a882-5414-4eae-abf8-d13116a3160b	With Frame	200.00
ccb406b9-9b97-4509-9ac4-ec64dffebc88	7ce5a882-5414-4eae-abf8-d13116a3160b	With Glass	150.00
4aa0531f-c6e1-453c-916b-625aaff4615a	60d2b338-e8c8-4de5-86d5-9be9ed32cd14	With Frame	200.00
a2a0649a-24ef-4a51-8739-ebd7ccc22703	60d2b338-e8c8-4de5-86d5-9be9ed32cd14	With Glass	150.00
f1280b0d-6653-47ef-9dc1-362e72ed6b68	59e5f629-8dec-438c-9d2f-9a3807c7b459	With Frame	200.00
84f3ea4c-cb0e-4e97-8010-297d3ca650ef	59e5f629-8dec-438c-9d2f-9a3807c7b459	With Glass	150.00
c44ab3fb-808e-4c74-abc6-160d253feae0	3a59da93-36ee-4d13-8088-f61f71adb9a7	With Frame	200.00
112c9247-162e-4377-a7cf-5a0369673cf0	70577fb5-1764-48ce-8caf-2db20701a964	With Frame	200.00
dfd452c0-1565-4777-8567-1a2f9cc931c6	70577fb5-1764-48ce-8caf-2db20701a964	With Glass	150.00
16a8ee74-9681-4173-847b-55aa9d20fd5e	6554bbfd-811d-4284-b6e0-4ab03d29d4eb	With Frame	200.00
faaebed8-eeeb-48ea-a5e7-1ff3def52db4	6554bbfd-811d-4284-b6e0-4ab03d29d4eb	With Glass	150.00
022f23ce-118f-484f-87d9-01e4e7a34468	d63f5ce2-523e-476d-ac2d-a1a7785d6b39	With Frame	200.00
259c23a8-9670-4b07-b760-d03dc8e55651	d63f5ce2-523e-476d-ac2d-a1a7785d6b39	With Glass	250.00
458047a9-319c-4440-ab81-40a60c0f6bc5	16370af0-be47-43e4-9e44-7aa6237680ed	With Frame	150.00
a146210c-c625-48ed-8749-8a5a1a75486a	16370af0-be47-43e4-9e44-7aa6237680ed	With GLass	100.00
ddf6dff4-642a-41c3-b21a-22d3328288d5	804fe5dc-9171-4314-83c2-5c02c00e608c	With Frame	200.00
6d33fb01-69db-42bb-86b1-f4cb9a005b8d	804fe5dc-9171-4314-83c2-5c02c00e608c	With Glass	250.00
847319cd-442f-4485-92c6-50dc11cfa54b	c7364869-236a-4587-a954-82ca7a2df015	With Frame	200.00
84ef6e8d-71aa-4d90-bfc3-33fc2c21e866	c7364869-236a-4587-a954-82ca7a2df015	With Glass	250.00
0538a967-01bd-43cf-810f-9008fd51d676	fd459162-3643-4975-87e9-443c7c95e478	Wtih Frame	200.00
fa74cbba-9974-4d70-ae48-47cb89ab87fc	fd459162-3643-4975-87e9-443c7c95e478	With Glass	150.00
15596639-53c2-42ad-8d5b-2e1040637fa1	5562d724-ad1d-4591-b67e-72d60fb94a86	With Frame	200.00
39a96216-8184-4ce0-8e6b-e17cc7be0193	5562d724-ad1d-4591-b67e-72d60fb94a86	With Glass	250.00
25ea4c01-933c-412f-9bd0-35a472044474	b1d5ff1a-fbc7-47ec-9c05-4d00118d341d	With Frame	200.00
08af6a19-4e71-4ba4-a4ef-bfc523466ffb	b1d5ff1a-fbc7-47ec-9c05-4d00118d341d	With Glass	100.00
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
564c6df6-59a5-4f23-85e6-a9842f37e7ae	2024-08-29 14:04:47.196347+00	0001-01-01 00:00:00+00	Niladri	Adak	admin@admin.com	$2a$04$JZGTRjSJn4dR2gKbSQFMqe7ussttLr7f40tyqBihMFCrqP/9EC6nO	1	admin	\N	\N
07f9985c-c5ac-4d69-aebb-02e17325aead	2024-08-29 14:24:15.158955+00	0001-01-01 00:00:00+00	arnab	Pal	arnab@co.in	$2a$04$3Cd1c0NGvnQI.hV4tMDJpOBpINxmbi.BrOggO/ZK5wyr9bqTqVchC	1	user	\N	\N
8cd9eaa7-dfd1-42be-af4d-b6e21ab20167	2024-08-29 14:44:17.326223+00	2024-08-29 14:44:17.326224+00	Akash	Biswas	akashrahul2006@gmail.com		1	user	\N	\N
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
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


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
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: orders orders_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id) ON DELETE CASCADE;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: product_images product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


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

