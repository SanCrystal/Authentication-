//require the book model to interact with the db
const Book = require('../models/bookSchema');

//projection to the client
const projection = {
    _id: 0
}

// createNewBook, fetchSingleBook, fetchAllBooks, updateSingleBook, deleteSingleBook 

//create a new book
module.exports.createNewBook = async(req, res) => {
    try {
        const book = await Book.create({
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            category: req.body.category,
            publishingDate: req.body.publishingDate,
            isbn: req.body.isbn,
            numberOfPages: req.body,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            tags: req.body.tags,
            numberOfPages: req.body.numberOfPages,
            purchaseCount: req.body.purchaseCount,
        })
        if (!book) res.status(400).json({ message: "an error occured ; could not add book" });
        res.status(200).json({ message: "Book was successfully added", payload: book });
    } catch (err) {
        if (err.code === 11000) return res.status(501).json({ message: "Book already exist!" });
        res.status(500).json({ message: err });
        console.log(err)
    };
};

//fetch single book
module.exports.fetchSingleBook = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id, projection);
        if (!book) return res.status(404).json({ message: "book not found!" });
        res.status(200).json({ message: "Book found!", payload: book });
    } catch (err) {
        if (err.name === "CastError") return res.status(400).json({ message: "error in making request" });
        res.status(500).json({ message: err.message });
    };
};

//fetch all books or a single book that matches the request query
module.exports.fetchAllBooks = async(req, res) => {
    try {
        const books = await Book.find(req.query, projection);
        if (!books || books.length == 0) return res.status(404).json({ message: "Book(s) not found" });
        res.status(200).json({ message: "book found successfully", payload: books });
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
};


//update a single book
module.exports.updateSingleBook = async(req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, projection);
        if (!book) return res.status(404).json({ message: "Book was not found, update failed" });
        book.save();
        res.status(200).json({ message: "book sucessfully updated", payload: book });
    } catch (err) {
        if (err.name === "CastError") return res.status(403).json({ message: "invalid book id" });
        res.status(500).json({ message: err.message });
    };
};

//delete single book
module.exports.deleteSingleBook = async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id, projection);
        if (!book || book.length == 0) res.status(404).json({ message: "book not found" });
        res.status(200).json({ message: "book sucessfully deleted", payload: book });
    } catch (err) {
        if (err.name === "CastError") return res.status(403).json({ message: "invalid book id" });
        res.status(500).json({ message: err.message });
    };
};



[{
        "title": "Tale by midnight",
        "author": "Winterfel J.S",
        "publisher": "Long Man",
        "category": "fairy tale",
        "publishingDate": "1940",
        "isbn": "78-uid-o-899",
        "numberOfPages": "590",
        "imageUrl": "img-90.jpg",
        "description": "A fairy tale about a magical princess and the wicked step mother queen",
        "tags": ["fantasy", "adventure", "romance"],
        "purchaseCount": "22"
    },
    {
        "title": "Things fall apart",
        "author": "Chinua Achebe",
        "publisher": "Linden pub",
        "category": "History",
        "publishingDate": "1949",
        "isbn": "78-uid-o-8990",
        "numberOfPages": "1900",
        "imageUrl": "img-456.jpg",
        "description": "A history of Biafra and the resilence of its people",
        "tags": ["legend", "war", "history"],
        "purchaseCount": "2200"
    }
]