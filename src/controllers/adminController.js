//require user schema
const User = require('../models/userSchema');
//require error handler
const { errorHandler } = require('../service/errorService');
//require services
const { decodeToken } = require('../service/authServices');
//display for user
const projection = {
    password: 0,
    userName: 0,

};
//check if user is an admin
module.exports.isAdmin = async(req, res, next) => {
    //get the user valid token
    const token = req.cookies.jwt;

    //verify the token if there is one
    if (token) {
        const decodedToken = await decodeToken(token);
        const user = await User.findById(decodedToken.payload, { role: 1 })
        if (!user) return res.status(401).render('error/401.ejs', { message: "Access Denied!" });
        if (user.role === "admin") {
            next()
        } else {
            return res.status(401).render('error/401.ejs', { message: "Access Denied! Only Admin users can view this page" });
        }
    } else {

        res.redirect('/login');
    };
};

//get user details

module.exports.showDetails = async(req, res) => {
    try {
        const user = await User.findById(req.params.id, projection);

        if (!user) return res.status(404).json({ message: `user with id ${req.params.id} not found!` });
        return res.status(200).render('adminView/user-detail.ejs', { user });
    } catch (err) {
        if (err.name === "CastError") return res.status(404).json({ message: errorHandler(err, req.params.id) });
        return res.status(500).json({ message: err })

    }
};
//assign user a role
module.exports.assignRole = async(id, role) => {
    const user = await User.findByIdAndUpdate(id, { role });
    if (!user) return res.status(404).render('error/404.ejs', { data: id });
    user.save();

};
//get the dash board
module.exports.getDashBoard = (req, res) => {
    res.status(200).render('adminView/dashboard.ejs', { data: { status: "loggedIn" } })
}