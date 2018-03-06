const mongoose   = require("mongoose")
      Campground = require("./models/campground"),
      Comment    = require("./models/comment");

const data = [
    {
        name: "Yosemite National Park",
        image: "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?ixlib=rb-0.3.5&s=8935928c5cde493495e46b00d7d752ad&auto=format&fit=crop&w=1950&q=80",
        description: "blah blah blah hhhhh"
    },
    {
        name: "Yosemite National Park",
        image: "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?ixlib=rb-0.3.5&s=8935928c5cde493495e46b00d7d752ad&auto=format&fit=crop&w=1950&q=80",
        description: "blah blah blah hhhhh"
    },
    {
        name: "Yosemite National Park",
        image: "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?ixlib=rb-0.3.5&s=8935928c5cde493495e46b00d7d752ad&auto=format&fit=crop&w=1950&q=80",
        description: "blah blah blah hhhhh"
    }
]
function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed campgrounds!");
         Comment.remove({}, function(err) {
             if(err){
                 console.log(err);
             }
             console.log("removed comments!");
              //add a few campgrounds
             data.forEach(function(seed){
                 Campground.create(seed, function(err, campground){
                     if(err){
                         console.log(err)
                     } else {
                         console.log("added a campground");
                         //create a comment
                         Comment.create(
                             {
                                 text: "This place is great, but I wish there was internet",
                                 author: "Homer"
                             }, function(err, comment){
                                 if(err){
                                     console.log(err);
                                 } else {
                                     campground.comments.push(comment._id);
                                     campground.save();
                                     console.log("Created new comment");
                                 }
                             });
                     }
                 });
             });
         });
     }); 
     //add a few comments
 }
  
 module.exports = seedDB;