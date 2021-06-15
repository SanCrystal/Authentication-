//require router from the express router
const router = require('express').Router();
//require auth middleware
const { notAssignedAuth, studentAuth, moderatorAuth, tutorAuth, adminAuth } = require('../middlewares/auth');

//require book controller
const { createNewBook, fetchSingleBook, fetchAllBooks, updateSingleBook, deleteSingleBook } = require('../controllers/bookController');

//create new book routes
router.post('/add-book', createNewBook);

//fetch single book
router.get('/books/:id', fetchSingleBook);

//fetch all books
router.get('/books', fetchAllBooks);

//update a single book 
router.put('/books/:id', updateSingleBook);

//delete single book
router.delete('/books/:id', deleteSingleBook);

module.exports = router;