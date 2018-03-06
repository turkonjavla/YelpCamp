const mongoose = require("mongoose");

let CampgroundSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Campground", CampgroundSchema);