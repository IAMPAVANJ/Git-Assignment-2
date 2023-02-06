const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user"); // Collection
const bodyParser = require('body-parser');
const conn = require("./connection/conn");
conn();
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');

const jwt = require('jsonwebtoken');
const secret = "RESTAPI";
const app = express();
// await mongoose.connect('mongodb://localhost/assignmet')
//parser for form data
app.use(bodyParser.urlencoded({ extended: false }))
//parser for app data
app.use(bodyParser.json())

// const secret = "RESTAPI";
// app.post("/posts", (req, res, next) =>{
//     // console.log("Hello");
//     const token = req.headers.authorization?.split("Bearer ")[1];
//     console.log(token);
//     if(token){
//         jwt.verify(token, secret, function(err, decoded) {
//             if(err) {
//                return res.status(403).json({
//                 status: "Failed",
//                 // msg: err.message,
//                 message: "Session expired Token is not valid"
//                 });
//             }
//             // console.log("Hello I am here");
//             console.log(decoded); //checking if we can decode token or not
//             req.user = decoded.data;
//             next();
//           });
//     } else {
//         res.status(403).json({
//             status: "Failed",
//             message: "User is not authenticated"
//         })
//     }

//     // console.log(token);
//     // next();
// })

app.use("/posts", (req, res, next) => {
    console.log("Hello");
    const token = req.headers.authorization?.split("test ")[1];
    console.log(token);
    // console.log("Hello I am here", res.user);

    if(token){
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
               return res.status(403).json({
                status: "Failed",
                message: "Token is not valid / Session timeout",
                error: err.message
                });
            }
            console.log("Hello I am here", req.user, decoded.data);
            req.user = decoded.data;
            next();
          });

    }else {
        res.status(403).json({
            status: "Failed",
            message: "User is not authenticated"
        })
    }
})


app.use("/users", userRoutes);
app.use("/", loginRoutes);
app.use("/", postRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to REST API backend!")
})

app.get("*", (req, res) => {
    res.status(404).send("API is not found")
})

app.listen(3000, () => console.log("Server is up at port 3000"));