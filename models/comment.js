const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    text: String,
    author: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comment", CommentSchema);