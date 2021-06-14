//requre router 
const router = require('express').Router();

// require authuser
const { showDetails } = require('../controllers/adminController')



//get user detail 
router.get('/user-detail/:id', showDetails);


module.exports = router;