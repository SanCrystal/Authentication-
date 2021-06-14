const { genToken, decodeToken } = require('../service/authServices');
//require the userSchema
const User = require('../models/userSchema');
const path = require('path');
//require jwt 
const jwt = require('jsonwebtoken');
//require cookie parser 
const cookie = require('cookie-parser');
//get error handler
// const { handle404 } = require('../controllers/errorHandler');
//require env path
require('dotenv').config({ path: path.dirname(__dirname).split(path.sep).slice(0, -1).join('/') + '/.env' });

//sign up user
module.exports.authorize = async(payload) => {
    return await genToken(payload);
};
//check if user is authorized
module.exports.isAuthorized = async(req, res, next) => {
    //get the user valid token
    const token = req.cookies.jwt;

    //verify the token if there is one
    if (token) {
        const decodedToken = await decodeToken(token);
        const user = await User.findById(decodedToken.payload)
        res.locals.email = user.email;
        next()
    } else {

        res.redirect('/login');
        // res.status(401).json({ message: "Access denied, must be logged in " });
    };
};
//fetch login page
module.exports.signup_get = async(req, res, next) => {
    res.render('authViews/signup.ejs')
}; //fetch login page
module.exports.login_get = async(req, res, next) => {

    res.render('authViews/login.ejs')
};
//login user
module.exports.login_post = async(req, res, next) => {
    //get user email and password
    const { email, password } = req.body;

    const user = await User.findUser(email, password);
    if (!user) {
        res.locals.data = email;
        return res.redirect(`/404?user=${email}`);
    };

    if (user.message) {
        res.locals.data = email;
        return res.redirect(`/404?user=${email}`);

    }
    const token = await this.authorize(user._id);
    //send cookie to the client 
    res.cookie("jwt", token, { maxAge: 1000 * 3 * 24 * 60 * 60, httpOnly: true, secure: false });
    res.redirect('/')

};
//logout user
module.exports.logout = (req, res) => {
    //send cookie to the client 
    res.cookie("jwt", '', { maxAge: 1, httpOnly: true, secure: false });
    res.status(200).json({ message: "login succesful..." })
};
//not assigned
module.exports.notAssignedAuth = (req, res, next) => {

};

//student
module.exports.studentAuth = (req, res, next) => {

};

//moderator
module.exports.moderatorAuth = (req, res, next) => {

};

//tutor
module.exports.tutorAuth = (req, res, next) => {

};

//admin
module.exports.adminAuth = async(req, res, next) => {
    //get token
    const token = req.cookies.jwt;
    //decode token
    const decodedToken = await decodeToken(token);
    const user = await User.findOne({ _id: decodedToken.payload });
    if (!user || (user.role !== "admin")) return res.status(401).render('error/401.ejs', { message: "access denied!" });
    console.log(`${user.role} access granted!`);
    next()



};