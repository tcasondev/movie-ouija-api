
CREATE TABLE movies(
    movie_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title VARCHAR NOT NULL,
    genre TEXT NOT NULL
);