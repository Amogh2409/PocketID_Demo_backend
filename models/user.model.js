const db = require('../database/db');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { Schema } = mongoose; // Schema object

const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email is required"],
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },

}, { timestamps: true });
// timestamps: true  will automatically add the createdAt and updatedAt fields for us.


UserSchema.pre('save', async function () {  // this will run before the save method is called
    var user = this; // this refers to the UserSchema object
    if (!user.isModified('password')) {
        return
    }
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(user.password, salt);

        user.password = hash;
    }
    catch (err) {
        console.log(err)
    }
}); // pre save hook

UserSchema.methods.comparePassword = async function (password) { // comparePassword is a custom method
    try {
        console.log("password", this.password)

        const IsValid = await bcrypt.compareSync(password, this.password);  // this will match the password with the hash password
        return IsValid;
    }
    catch (err) {
        console.log(err)
    }
}; // comparePassword method

const UserModel = db.model('User', UserSchema); // User is the name of the collection
module.exports = UserModel;


