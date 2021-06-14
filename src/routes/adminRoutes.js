//require express router 
const router = require('express').Router();
//require admin controller 
const { isAdmin, getDashBoard } = require('../controllers/adminController')
    //require authuser controller
const { isAuthorized } = require('../middlewares/authUser');

//admin dash board
router.get('/app.admin/dashboard', isAuthorized, isAdmin, getDashBoard)


module.exports = router;