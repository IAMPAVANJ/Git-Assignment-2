const express = require("express");
const { Result } = require("express-validator"); //middleware

const { body, validationResult } = require('express-validator')
const router = express.Router();


const User = require("../models/user")


const bodyParser = require('body-parser');
router.use(bodyParser.json());

const bcrypt = require("bcrypt");


const jwt = require('jsonwebtoken');
const secret = "RESTAPI" //you can make any secret code

router.post("/register", // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5, max: 20 }),
    body("name").isAlphanumeric(), async (req, res) => {
        // 3. User is new, we will register

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // 2. check Username already exists
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                status: "Failed",
                message: "User already exists"
            });
        }
        // 3. Create the new user in database
        bcrypt.hash(password, 10, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            const data = await User.create({
                name,
                email,
                password: hash
            });
            return res.status(200).json({
                status: "Success",
                message: "User successfuully registerd",
                data
            })
        });
    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: "Registration unsuccessful"
        })
    }
});


router.post("/login", // username must be an email
body('email').isEmail(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // 2. check Username already exists
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                status: "Failed",
                message: "Unnown user/ User is not registered"
            })
        }
        // Load hash from your password DB.
        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(err){
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            if(result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id,
                }, secret);
                // console.log("Check");
                console.log(req.user);
                // console.log(req.user);
                return res.status(200).json({
                    status: "Succces",
                    message: "Login successful",
                    token
                    // user
                })

            }else {
                return res.status(400).json({
                    status: "Failed",
                    message: "Invalid credentails"
                })
            }
        });


    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
    // 1. Validate the data 
});
module.exports = router;


// router.post("/login",
// // router.post("/register",
//     // res.send("Register here..."),
//     //inputid and password
//     // 1. validate the data
//     // 2. check username already exists
//     // 3. if user is new, we will register
//     body('email').isEmail(),
//     body('password').isLength({ min: 5, max: 26 }), async (req, res) => {
//     // body("name").isAlphanumeric(), async (req, res) => {

//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }

//             // res.send("Ok")

//             //2. check user exist or not
//             const { name, email, password } = req.body;

//             const user = await User.findOne({ email })
//             if (!user) {
//                 return res.status(409).json({ // 409 for duplicate request
//                     status: "Failed",
//                     message: "Email not found / User is not registered"
//                 });
//             }
//             bcrypt.compare(password, 10, function(err, result){
//                 if (err) {
//                     return res.status(500).json({
//                         status: "Failed",
//                         message: err.message
//                     })
//                 }
//                 if(result){
//                     return res.status(400).json({
//                         status: "Sucess",
//                         message: "Login Sucessful"
//                     })
//                 } else{
//                     return res.status(400).json({
//                         status: "Failed",
//                         message: "Invalid credentaial"
//                     })
//                 }
//             })

//             // if (user) {
//             //     return res.status(409).json({ // 409 for duplicate request
//             //         status: "Failed",
//             //         message: "User already exists"
//             //     });
//             // }

//             //3. Create the new user in database   
//             // Store hash in your password DB.
//             // bcrypt.hash(password, 10, async function (err, hash) { // 10 random characters will create for hashing
//             //     if (err) {
//             //         return res.status(500).json({
//             //             status: "Failed",
//             //             message: err.message
//             //         })
//             //     }
//             //     const data = await User.create({
//             //         name,
//             //         email,
//             //         password: hash
//             //     });
//             //     return res.status(200).json({
//             //         status: "Success",
//             //         message: "User Sucessfully registered",
//             //         data
//             //     })

//             // });
//             // res.send("Ok");  
//         } catch (e) {
//             return res.status(500).json({
//                 status: "Failed",
//                 message: e.message
//                 // message: "Registration Failed"
//             })
//         }
//     });

// module.exports = router;