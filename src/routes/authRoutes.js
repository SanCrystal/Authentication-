//requre router 
const router = require('express').Router();


//require authuser
const { login_post, login_get, signup_get, isAuthorized, logout } = require('../middlewares/auth');
//require user controllers
const { createNewUser } = require('../controllers/userController')




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


module.exports = router;