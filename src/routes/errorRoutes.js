//get the router 
const router = require('express').Router();
//get error handler

const { handle404 } = require('../controllers/errorHandler');

router.get('/404', handle404);

module.exports = router;