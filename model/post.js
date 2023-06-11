// import modules/packages
const mongoose = require("mongoose");

// postSchema instance
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// schema model instance
const Post = mongoose.model('post', postSchema);

// export model instance
module.exports = Post;