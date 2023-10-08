const UserModel = require("../models/User")
const {hashPassword, comparePassword} = require("../helpers/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username) {
            return res.json({
                error: 'Username is required'
            })
        };
        if (!password || password.length > 8) {
            return res.json({
                error: 'Password is required and should not be more than 8 characters'
            })
        };
        const exist = await UserModel.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = await UserModel.create({
            username, email, password: hashedPassword
        }).then((data) => {
            console.log("Saved successfully...");
            res.status(201).send(data);
        })
    }
    catch (error) {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    }
};

module.exports.loginUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'No user found'
            })
        }

        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.username}, process.env.JWT_SECRET, {expiresIn: 60}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user);
            })
        }
        if(!match) {
            res.json({
                error: 'Passwords donot match'
            })
        }

    } catch (error){
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    }
};

module.exports.getProfile = (req, res) => {
    const {token} = req.cookies;
    console.log("Token: ", token);
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {expiresIn: 60}, (err, user) => {
            if(err) {
                return res.send({status: "error", data: "token expired"});
            };
            console.log("user: ", user);
            return res.json(user)
        })
    } else {
        return res.json(null)
    }
};