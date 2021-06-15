const { encrypt, comparePassword } = require('../service/authServices');
//require validator
const { isMobilePhone, isEmail, isStrongPassword } = require('validator');

//require mongoose


const mongoose = require('mongoose');

const { Schema } = mongoose;

//create a new instance of schema 

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true, validate: [isEmail, "Please enter a valid email"] },
    userName: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true, validate: [isMobilePhone, "Please input a valid mobile number"] },
    password: { type: String, required: true },
    imageUrl: { type: String, required: false },
    role: {
        type: String,
        required: true,
        default: "not assigned",
        enum: ["admin", "tutor", "moderator", "student", "not assigned"]
    }
}, { timestamps: true, strict: true });

userSchema.pre('save', async function(next) {
    const roleChoice = ['tutor', 'student']
    roleChoice.forEach(role => {
        if (this.role === role) {
            this.role = role;
        } else {
            this.role = "not assigned"
        }
    });
    this.password = await encrypt(this.password);
    next();
});

userSchema.statics.findUser = async function(email, password) {
    //check if user exist in db
    const user = await this.findOne({ email });
    if (!user) return { message: `${email} does not exist` };
    //compare password
    const validPass = await comparePassword(password, user.password); //returns a boolean true or false
    if (validPass) return user;
    return { message: "incorrect email or  password, please enter a valid email and password" }

};

//make a model from the userSchema

const User = mongoose.model("users", userSchema);
module.exports = User;