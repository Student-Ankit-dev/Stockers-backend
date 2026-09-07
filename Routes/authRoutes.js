const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Models/User");


// Signup

router.post("/signup", async (req, res) => {

    console.log(req.headers);
    console.log(req.body);

    try {

        const {
            username,
            email,
            password
        } = req.body;


        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }


        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const newUser = new User({

            username,
            email,
            password: hashedPassword

        });


        await newUser.save();


        res.json({
            message: "Signup successful"
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



// Login

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user = await User.findOne({
            email
        });


        if (!user) {

            return res.status(400).json({
                message: "Invalid email"
            });

        }


        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isPasswordCorrect) {

            return res.status(400).json({
                message: "Wrong password"
            });

        }


        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.json({

            message: "Login successful",
            token

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;