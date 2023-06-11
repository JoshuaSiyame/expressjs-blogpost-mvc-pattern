// import required modules/packages
const Post = require("../model/post");

// function as the controllers
let testRouteHandler = (req, res)=>{
    res.status(200).send("Working");
};

let getAllPosts = async (req, res) =>{
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
};

let getPostById = async (req, res)=>{
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
};

let createNewPost = async (req, res)=>{
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
};

let deletePostById = async (req, res)=>{
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
};

module.exports = { testRouteHandler, getAllPosts, getPostById, createNewPost, deletePostById };