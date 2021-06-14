//createNewUser fetchAllUsers fetchSingleUser updateUser 
//require authuser
const { authorize, login } = require('../middlewares/authUser');
//require cookie parser
const cookie = require('cookie-parser');
//require user
const User = require('../models/userSchema');
//require error handler
const { errorHandler } = require('../service/errorService');
//user display returned to view
const projection = {
    password: 0,
    userName: 0,

};

// create new user controller


module.exports.createNewUser = async(req, res) => {


    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            email: req.body.email,
            userName: req.body.userName,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            imageUrl: req.body.imageUrl,
            role: req.body.role
        });
        //create token and send to the user
        console.log(newUser._id)
        const token = await authorize(newUser._id);
        res.cookie('jwt', token, { maxAge: 1000 * 3 * 24 * 60 * 60, httpOnly: true, secure: false, sameSite: "strict" });
        res.status(200).json({ "message": "user created sucessfully", payload: newUser, });

    } catch (err) {
        res.status(500).json({ message: errorHandler(err, req.params.id) })
    }



}

//fetch a single user
module.exports.fetchSingleUser = async(req, res) => {
        try {
            const user = await User.findById(req.params.id, projection);
            if (!user) return res.status(404).json({ message: `user with id ${req.params.id} not found!` });
            return res.status(200).json({ message: "user found!", payload: user });
        } catch (err) {
            if (err.name === "CastError") return res.status(404).json({ message: errorHandler(err, req.params.id) })
            return res.status(500).json({ message: err })

        }
    }
    //fetch alll the users
module.exports.fetchAllUsers = async(req, res) => {
    try {
        const users = await User.find({}, projection);

        if (users.length === 0) return res.status(404).json({ message: "No users found!" });
        return res.status(200).render('adminView/listUsers.ejs', { users });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

//update a single user

module.exports.updateSingleUser = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, projection);
        if (!user) return res.status(404).json({ message: "user not found!" });
        user.save();
        res.status(200).json({ message: "user successfully updated", payload: user })
    } catch (err) {
        if (err.name === "CastError") return res.status(404).json({ message: `user with id ${req.params.id} not found!` })
        return res.status(500).json({ message: err.message })
    }
}

//delete single user
module.exports.deleteSingleUser = async(req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({ message: "user does not exist!" });
            return res.status(200).json({ message: "user was successfully deleted", payload: user });
        } catch (err) {
            if (err.name === "CastError") return res.status(404).json({ message: `user with id ${req.params.id} not found!` })
            return res.status(500).json({ message: err.message });
        }
    }
    //fetch users for duplicate check
module.exports.fetchAllUsersForDuplicateCheck = async(req, res) => {
    const { userCredential, credentialValue } = req.body;

    const details = await User.find({
        [credentialValue]: userCredential
    }, {
        [credentialValue]: 1
    });
    //check if the is no details
    if (details.length == 0) {

        return res.status(200).json({ message: "available" })
    } else {
        return res.status(200).json({ message: "taken" })
    };
};
// [{
//         "role": "not assigned",
//         "name": "daddy broke",
//         "age": "45",
//         "gender": "male",
//         "email": "poordaddy@gmail.com",
//         "userName": "brokedaddy222",
//         "phoneNumber": "09055500003",
//         "password": "2iambrokehelpme",
//         "imageUrl": "img-1238broke.jpg"
//     },

//     {
//         "role": "tutor",
//         "name": "Paul",
//         "age": "24",
//         "gender": "male",
//         "email": "freyergod@gmail.com",
//         "userName": "frey123",
//         "phoneNumber": "09055510199",
//         "password": "1235fry",
//         "imageUrl": "img-1238.jpg"
//     }
// ]


// { "name": "Amanze", "age": "25", "gender": "male", "email": "kingquarters@gmail.com", "userName": "king123", "phoneNumber": "08130807989", "password": "12345user", "imageUrl": "img-123.jpg", "role": "level 1 user" }