const { encrypt, comparePassword } = require('../service/authServices')
    //require mongoose

const mongoose = require('mongoose');

const { Schema } = mongoose;

//create a new instance of schema 

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    imageUrl: { type: String, required: false },
    role: {
        type: String,
        required: true,
        default: "not assigned",
        enum: ["admin", "tutor", "moderator", "student", "not assigned"]
    }
}, { timestamps: true, strict: true });

userSchema.pre('save', async function(next) {

    this.password = await encrypt(this.password);
    next();
});
userSchema.statics.findUser = async function(email, password) {
    //check if user exist in db
    if (email) {
        const user = await this.findOne({ email });
        if (!user) return { message: "user does not exist" };
        //compare password
        const validPass = await comparePassword(password, user.password); //returns a boolean true or false
        if (validPass) return user;
        return { message: "incorrect password, please enter a valid password" }
    }
    return { noEmail: "access denied , please log in" }

};

//make a model from the userSchema

const User = mongoose.model("users", userSchema);
module.exports = User;