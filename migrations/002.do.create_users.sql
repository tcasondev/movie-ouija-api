CREATE TABLE users(
    user_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    email VARCHAR NOT NULL,
    user_name VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL 
);