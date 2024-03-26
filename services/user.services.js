// Need model to interact with database

const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken'); // to generate signed token


class UserServices {
    static async registerUser(email, password) {
        try {
            console.log("email", email, "password", password);
            const createUser = new UserModel({ email, password });
            return await createUser.save();
        }
        catch (err) {
            console.log(err)
        }
    }
    static async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email }); // findOne will return the first document that matches the query criteria
        }
        catch (err) {
            console.log(err)
        }
    }

    static async checkUser(email) {
        try {
            return await UserModel.findOne({ email });
        }
        catch (err) {
            console.log(err)
        }


    }

    static async generateToken(tokenData, JWTSecret_key, expiryTime) {
        try {
            return jwt.sign(tokenData, JWTSecret_key, { expiresIn: expiryTime });
        }
        catch (err) {
            console.log(err)
        }

    }
}
module.exports = UserServices;
