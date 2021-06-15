//require express router
const router = require('express').Router();
//require authuser
const { authorize, login_post, login_get, signup_get, isAuthorized, logout, adminAuth } = require('../middlewares/auth');
//require user controllers
const { createNewUser, fetchSingleUser, fetchAllUsers, updateSingleUser, deleteSingleUser, fetchAllUsersForDuplicateCheck } = require('../controllers/userController')
    //get error handler
    // const { handle404 } = require('../controllers/errorHandler');

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