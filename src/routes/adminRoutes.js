//require express router 
const router = require('express').Router();
// require authuser
const { showDetails } = require('../controllers/adminController')
    //require admin controller 
const { isAdmin, getDashBoard } = require('../controllers/adminController')
    //require authuser controller
const { isAuthorized } = require('../middlewares/auth');

//admin dash board
router.get('/app.admin/dashboard', isAuthorized, isAdmin, getDashBoard)
    //get user detail 
router.get('/user-detail/:id', isAuthorized, showDetails);

module.exports = router;