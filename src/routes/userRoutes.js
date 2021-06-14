//require express router
const router = require('express').Router();
//require authuser
const { authorize, login_post, login_get, signup_get, isAuthorized, logout, adminAuth } = require('../middlewares/authUser');
//require user controllers
const { createNewUser, fetchSingleUser, fetchAllUsers, updateSingleUser, deleteSingleUser, fetchAllUsersForDuplicateCheck } = require('../controllers/userController')
    //get error handler
    // const { handle404 } = require('../controllers/errorHandler');

//create user routes
router.post('/signup', createNewUser);
//create user routes get route
router.get('/signup', signup_get);
//login page get route
router.get('/login', login_get);
//login route 
router.post('/login', login_post);
//login route 
router.get('/logout', isAuthorized, logout);
//fetch all users
router.get('/users', isAuthorized, adminAuth, fetchAllUsers);
//fetch all users
router.post('/users', fetchAllUsersForDuplicateCheck);

//fetch a single user
router.get('/users/:id', isAuthorized, fetchSingleUser);

//update a single user
router.put('/users/:id', isAuthorized, updateSingleUser);

//delete a single user
router.delete('/users/:id', isAuthorized, deleteSingleUser);

module.exports = router;