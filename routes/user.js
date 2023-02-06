const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user"); // Collection
const bodyParser = require('body-parser');
const router  = express.Router();

// await mongoose.connect('mongodb://localhost/assignmet')
//parser for form data
router.use(bodyParser.urlencoded({ extended: false }))
//parser for app data
router.use(bodyParser.json())

// CRUD operations
// POST - register
router.post("/register", async (req, res) =>{
    try{
        const user = await User.create(req.body);
        res.json(201).json({
            status: "Success",
            user
        })
        // res.send("OK");
        console.log(req.body);
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

//Get - login
router.post("/login", async (req, res) =>{
    try{
        const user = await User.find({_id : req.params.id});
        console.log(id);
        // console.log(user);
        res.status(200).json({
            status: "Success",
            user
        })
        
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

module.exports = router;

//Post - image
// router.post("/posts", async (req, res) =>{
//     try{
//         const user = await User.find();
//         res.status(201).json({
//             status: "Success",
//             user
//         })
//     }catch(e){
//         res.status(500).json({
//             status: "Failed",
//             message: e.message
//         })
//     }
// });


//Create Posts in collection - headers authorization key value
// router.post("/posts", async (req, res) =>{
//     try{
//         const user = await User.find();
//         res.status(201).json({
//             status: "Success",
//             user
//         })
//     }catch(e){
//         res.status(500).json({
//             status: "Failed",
//             message: e.message
//         })
//     }
// });

//Update - edit body or image of post
// router.post("/posts/:postId", async (req, res) =>{
//     try{
//         const user = await User.find();
//         res.status(201).json({
//             status: "Success",
//             user
//         })
//     }catch(e){
//         res.status(500).json({
//             status: "Failed",
//             message: e.message
//         })
//     }
// });

// Get by ID
router.get("/posts/:postId", async (req, res) =>{
    try{
        const user = await User.findById({_id:req.params.postId});
        res.status(201).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});


//Delete - delection post from collection
// router.post("/posts/:postId", async (req, res) =>{
//     try{
//         const user = await User.find();
//         res.status(201).json({
//             status: "Successfully deleted",
//             user
//         })
//     }catch(e){
//         res.status(500).json({
//             status: "Failed",
//             message: e.message
//         })
//     }
// });


// Get - all
router.get("/allposts", async (req, res) =>{
    try{
        const user = await User.find();
        res.status(201).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});


//update
// router.put("/posts/postId", async (req, res) =>{
//     try{
//         await User.updateOne({_id : req.params.id}, req.body);
//         const user = await User.findOne({_id : req.params.id});
//         console.log(id);
//         res.status(200).json({
//             status: "Success",
//             user
//         })
//     }catch(e){
//         res.status(500).json({
//             status: "Failed",
//             message: e.message
//         })
//     }
// });


//delete
// router.delete("/posts/:postId", async (req, res) =>{
//     try{
//         const user = await User.deleteOne({_id : req.params.id});
//         res.status(200).json({
//             status: "Success",
//             user
//         })
//     }catch(e){
//         res.status(500).json({
//             status: "Failed",
//             message: e.message
//         })
//     }
// });

// module.exports = router;