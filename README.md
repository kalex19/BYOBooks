# BYOBooks

## Table of Contents
* [App Set-up](#App-Set-up)
* [How to Use](#How-to-Use)
* [Project Emphasis](#Project-Emphasis)
* [About](#About)

## BYOBooks App
This project focuses on learning back-end technologies: Node/Express, Knex, SQL, Postgres.

The developer created a one-to-many relational database based on classic books and the book reviews.

## App Set-up
If you'd like to clone this repository to your own local machine, run the following command in your terminal:

`git clone https://github.com/kalex19/BYOBooks.git`

Then run the following command to install dependencies:

`npm install`

To view the app in action, run the following command in your terminal:

`npm start`

Then, go to `http://localhost:3000/` in your browser to see the code running in the browser.

# How to Use

## Get Data

### Get all books

METHOD: GET

ENDPOINT: /api/v1/books

EXAMPLE RESPONSE:
```
[
    {
        "id": 1,
        "title": "The Scarlet Letter",
        "author": "Nathaniel Hawthorne",
        "year_published": 1850,
        "genre": "Historical Fiction",
        "created_at": "2019-08-12T03:46:41.284Z",
        "updated_at": "2019-08-12T03:46:41.284Z"
    },
    {
        "id": 2,
        "title": "Frankenstein",
        "author": "Mary Shelley",
        "year_published": 1823,
        "genre": "Horror Fiction",
        "created_at": "2019-08-12T03:46:41.284Z",
        "updated_at": "2019-08-12T03:46:41.284Z"
    },
   ]
   ```

### Get specific book

METHOD: GET

ENDPOINT: /api/v1/books/30

EXAMPLE RESPONSE:
```
[
    {
        "id": 30,
        "title": "The Wind in the Willows",
        "author": "Kenneth Grahame",
        "year_published": 1908,
        "genre": "Children's Fiction",
        "created_at": "2019-08-12T03:46:41.284Z",
        "updated_at": "2019-08-12T03:46:41.284Z"
    }
]
```
    
    
### Get all reviews

METHOD: GET

ENDPOINT: /api/v1/reviews

EXAMPLE RESPONSE:
```
[
    {
        "id": 1,
        "review": "If you can remember the discussions from high-school English class about this book--read it again and see how much you've grown up! If you've been married, betrayed, or have children- it's a totally different read from when your only worry is breaking curfew and going to the mall.",
        "stars": 5,
        "book_id": 1,
        "created_at": "2019-08-12T03:46:41.360Z",
        "updated_at": "2019-08-12T03:46:41.360Z"
    },
    {
        "id": 2,
        "review": "This is a very misunderstood story that sparked a concept that took on a life of it's own. There is no scary castle, no hunchback, or villigars with pitch forks! It is a story not about a monster but about what could happen when man kind tries to play creator. You end up feeling sorry for the creature.",
        "stars": 4,
        "book_id": 2,
        "created_at": "2019-08-12T03:46:41.361Z",
        "updated_at": "2019-08-12T03:46:41.361Z"
    },
   ]
   ```

### Get specific review

METHID: GET

ENDPOINT: /api/v1/reviews/60

EXAMPLE RESPONSE:
```
[
    {
        "id": 60,
        "review": "The Wind in the Willows is the perfect book that everyone would enjoy!",
        "stars": 5,
        "book_id": 30,
        "created_at": "2019-08-12T03:46:41.402Z",
        "updated_at": "2019-08-12T03:46:41.402Z"
    }
]
```
 
 
## Post data

### Add a new book

METHOD: POST

ENDPOINT: /api/v1/books

EXAMPLE REQUEST:

```
{
    "id": 31,
    "title": "American Street", 
    "author": "Ibi Zoboi", 
    "year_published": 2005, 
    "genre": "Historical Fiction"
}
```

EXAMPLE RESPONSE:

```
{
    "id": 31
}
```

NOTE: All fields above are required

### Add a new review

METHOD: POST

ENDPOINT: /api/v1/reviews

EXAMPLE REQUEST:

```
{
    "review": "An American Classic", 
    "star": 5, 
    "book_id": 31
}
```

EXAMPLE RESPONSE:

```
{
    "id": 70
}
```
NOTE: All fields above are required

## Delete Data

### Delete any record from books or reviews

METHOD: DELETE

ENDPOINT: /api/v1/:table/:id


EXAMPLE RESPONSE:

```
{
    "Entry successfully deleted."
}
```

## Project Emphasis

 - [x] Node.js/Express
 - [x] Knex
 - [x] Relational Databases
 - [x] Nightmare (web-scraping)
 - [x] SQL
 - [x] Postgres
 
 
## About

[Katie Lewis](github.com/kalex19)

Licensing
All credit goes to Turing School of Software for providing the project specifications.
