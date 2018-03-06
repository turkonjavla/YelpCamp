const mongoose = require("mongoose"),
      Commnet  = require("./comment");

const CampgroundSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    description: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", CampgroundSchema);