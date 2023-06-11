// import modules/packages
const express = require("express");
const deletePostById = require("../controllers/controller").deletePostById;
const getPostById = require("../controllers/controller").getPostById;
const testRouteHandler = require("../controllers/controller").testRouteHandler;
const getAllPosts = require("../controllers/controller").getAllPosts
const createNewPost = require("../controllers/controller").createNewPost;

// router instance
const router = express.Router();

// endpoints
router.get("/test", testRouteHandler);

router.get("/posts", getAllPosts);

router.get("/post/:postId", getPostById);

router.post("/new-post", createNewPost);

// assuming no edit route handler

router.delete("/post/:postId", deletePostById);

// export router instance
module.exports = router;
