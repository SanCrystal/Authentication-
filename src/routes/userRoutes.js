//require express router
const router = require('express').Router();
//require authuser
const { authorize, login, isAuthorized, logout, adminAuth } = require('../middlewares/authUser');
//require user controllers
const { createNewUser, fetchSingleUser, fetchAllUsers, updateSingleUser, deleteSingleUser } = require('../controllers/userController')


//create user routes
router.post('/signup', createNewUser);

//login route 
router.post('/login', login);
//login route 
router.get('/logout', logout);
//fetch all users
router.get('/users', isAuthorized, adminAuth, fetchAllUsers);

//fetch a single user
router.get('/users/:id', isAuthorized, fetchSingleUser);

//update a single user
router.put('/users/:id', isAuthorized, updateSingleUser);

//delete a single user
router.delete('/users/:id', isAuthorized, deleteSingleUser);

module.exports = router;