DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);


DROP TABLE IF EXISTS users;

CREATE TABLE users (
  email varchar(255) UNIQUE NOT NULL PRIMARY KEY,
  password varchar(255) NOT NULL,
  role text DEFAULT regular
);
