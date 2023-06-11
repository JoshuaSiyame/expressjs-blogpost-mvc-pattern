// import modules/packages
const express = require("express");
const Post = require("../model/post");

// router instance
const router = express.Router();

// endpoints
router.get("/test", (req, res)=>{
    res.status(200).send("Working");
});

router.get("/posts", async (req, res)=>{
    try {
        // retrieve all posts from the database
        const posts = await Post.find({});
        if(posts.length ===0 ){
            return res.status(200).send("No posts yet");
        };
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Something broke.!");
    };
});

router.get("/post/:postId", async (req, res)=>{
    try {
        // get the post id
        const postId = req.params.postId;

        // get post based on the id
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).send("Post not found");
        };

        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something broke");
    };
});

router.post("/new-post", async (req, res)=>{
    try{
        // object destructure
        const { title, body } = req.body;

        // data validations
        if(!title || title.length === 0 || title === ""){
            return res.status(400).send("Title is required");
        };

        if(!body || body.length === 0 || body === ""){
            return res.status(400).send("Body is required");
        };

        // post data
        const newPost = new Post({
            title,
            body
        });

        // preview the post
        // console.log(newPost);
        
        // save the post
        await newPost.save();

        res.status(200).send("Post saved");

    }catch(err){
        console.error(err);
        return res.status(500).send("Something broke.!");
    };
});

// assuming no edit route handler

router.delete("/post/:postId", async (req, res)=>{
    try{
        // get the requested id
        const postId = req.params.postId;

        // delete the post by id
        await Post.findByIdAndDelete(postId);

        res.status(200).send("Post deleted");
    }catch(err){
        console.error(err);
        return res.status(500).send("Something broke");
    };
});

// export router instance
module.exports = router;
