const UserServices = require('../services/user.services');

exports.register = async (req, res) => {
    try {
        console.log("req.body", req.body); // req.body is the data that is sent to the server from the client
        const { email, password } = req.body; // destructuring the req.body object
        const duplicateUser = await UserServices.getUserByEmail(email);// check if user already exists

        if (duplicateUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await UserServices.registerUser(email, password); // register the user

        res.json({ status: "success", message: "User registered successfully" });
    }
    catch (err) {
        console.log(err)
        next(err);
    }
}


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body; // destructuring the req.body object

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter email and password" });
        }
        let user = await UserServices.checkUser(email); // check if user exists
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordMatch = await user.comparePassword(password); // compare the password

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // generate token

        let tokenData;
        tokenData = {
            id: user._id,
            email: user.email
        }; // data to be passed to the token

        const token = await UserServices.generateToken(tokenData, process.env.JWTSecret_key, "1h") // generate token "1h" means token will expire in 1 hour

        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            
        });
    }
    catch (err) {
        console.log(err)
        next(err);
    }
}