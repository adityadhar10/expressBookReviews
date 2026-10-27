const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(404).json({ message: "Unable to register user: username and/or password missing" });
    }

    if (isValid(username)) {
        users.push({ username, password });
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
        return res.status(404).json({ message: "User already exists!" });
    }
});

// Task 1 & Task 10: Get the book list available in the shop using async-await / Promise
public_users.get('/', async function (req, res) {
    try {
        const getBooks = new Promise((resolve) => {
            resolve(books);
        });
        const bookList = await getBooks;
        return res.status(200).send(JSON.stringify(bookList, null, 4));
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books list" });
    }
});

// Task 2 & Task 11: Get book details based on ISBN using Promise
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
    })
    .then((book) => {
        return res.status(200).json(book);
    })
    .catch((err) => {
        return res.status(404).json({ message: err });
    });
});

// Task 3 & Task 12: Get book details based on author using Promise
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();
    new Promise((resolve, reject) => {
        const matchingBooks = [];
        const isbns = Object.keys(books);
        isbns.forEach((isbn) => {
            if (books[isbn].author.toLowerCase() === author) {
                matchingBooks.push({ isbn, ...books[isbn] });
            }
        });
        if (matchingBooks.length > 0) {
            resolve(matchingBooks);
        } else {
            reject("No books found for this author");
        }
    })
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((err) => {
        return res.status(404).json({ message: err });
    });
});

// Task 4 & Task 13: Get all books based on title using Promise
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    new Promise((resolve, reject) => {
        const matchingBooks = [];
        const isbns = Object.keys(books);
        isbns.forEach((isbn) => {
            if (books[isbn].title.toLowerCase() === title) {
                matchingBooks.push({ isbn, ...books[isbn] });
            }
        });
        if (matchingBooks.length > 0) {
            resolve(matchingBooks);
        } else {
            reject("No books found with this title");
        }
    })
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((err) => {
        return res.status(404).json({ message: err });
    });
});

// Task 5: Get book review based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
