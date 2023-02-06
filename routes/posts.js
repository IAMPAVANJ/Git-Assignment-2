const express = require("express");
// const { Result } = require("express-validator"); //middleware
const router = express.Router();
const User = require("../models/user")
const bodyParser = require('body-parser');
router.use(bodyParser.json());
// router.use(express.json())

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const Post = require("../models/post")

const secret = "RESTAPI";

//Create post
router.post("/posts", async (req, res) => {
    try{
        console.log("I m in create posts");
        console.log(req.body);
        console.log(req.user);

        const posts = await Post.create({
            title: req.body.title,
            body: req.body.body,
            image: req.body.body,
            user: req.user
        });

        res.json({
            status: "Success",
            posts
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

});

router.get("/posts", async (req, res) => {
    try{
        const posts = await Post.find();
        res.json({
            status: "Success",
            posts
        })

    }catch(e){
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

// router.get("/posts", (req, res) =>{
//     res.send("Ok")
// });

//Update posts
router.put("/posts/:postId", async (req, res) => {
    try{
        console.log("I m in update posts");
        const updatedposts = await Post.updateOne({_id : req.params.postId}? req.body: {_id : req.params.postId});
        // const updatedposts = await User.findOne({_id : req.params.postId});
            res.status(200).json({
                status: "Post updated - Success",
                updatedposts
        });

        res.json({
            status: "Success",
            updatedposts
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

});


//Delete posts
router.delete("/posts/:postId", async (req, res) => {
    try{
        console.log("I m in delete posts");
        // console.log(req.body);
        // console.log(req.user);
        await Post.deleteOne({_id : req.params.postId}, req.body);
            res.status(200).json({
            status: "Post deleted - Success",
        });

    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

});


module.exports = router;
