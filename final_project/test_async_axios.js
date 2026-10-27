const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:5000';

// Task 10: Get all books using async/await with Axios
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log("=== Task 10: Get All Books (Async/Await) ===");
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Task 10 Error:", error.response ? error.response.data : error.message);
    }
}

// Task 11: Search by ISBN using Promises with Axios
function getBookByISBN(isbn) {
    console.log(`\n=== Task 11: Search by ISBN: ${isbn} (Promise) ===`);
    axios.get(`${BASE_URL}/isbn/${isbn}`)
        .then(response => {
            console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(error => {
            console.error("Task 11 Error:", error.response ? error.response.data : error.message);
        });
}

// Task 12: Search by Author using Promises with Axios
function getBooksByAuthor(author) {
    console.log(`\n=== Task 12: Search by Author: ${author} (Promise) ===`);
    axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`)
        .then(response => {
            console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(error => {
            console.error("Task 12 Error:", error.response ? error.response.data : error.message);
        });
}

// Task 13: Search by Title using async/await with Axios
async function getBooksByTitle(title) {
    try {
        console.log(`\n=== Task 13: Search by Title: ${title} (Async/Await) ===`);
        const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Task 13 Error:", error.response ? error.response.data : error.message);
    }
}

// Execute all sequentially
async function runAll() {
    await getAllBooks();
    await new Promise(resolve => {
        console.log(`\n=== Task 11: Search by ISBN: 1 (Promise) ===`);
        axios.get(`${BASE_URL}/isbn/1`)
            .then(res => { console.log(JSON.stringify(res.data, null, 2)); resolve(); })
            .catch(err => { console.error(err); resolve(); });
    });
    await new Promise(resolve => {
        console.log(`\n=== Task 12: Search by Author: Jane Austen (Promise) ===`);
        axios.get(`${BASE_URL}/author/${encodeURIComponent('Jane Austen')}`)
            .then(res => { console.log(JSON.stringify(res.data, null, 2)); resolve(); })
            .catch(err => { console.error(err); resolve(); });
    });
    await getBooksByTitle("Things Fall Apart");
}

runAll();
