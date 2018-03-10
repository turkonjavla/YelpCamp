const bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      express    = require("express"),
      moment     = require("moment"),
      app        = express(),
      port       = 5050;

// Models
const Campground = require("./models/campground");

// Seeds file
const seedDB = require("./seeds");
const db = process.env.DATABASEURL; // stored in .env file

 seedDB();
mongoose.connect(db)
    .then(() => console.log("MongoDB connected!"))
    .catch(error => console.log("There was an error connecting to MongoDB"));

app.use(express.static(__dirname + "/public")); 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Add moment js
app.locals.moment = moment;

/* 
##########################
         ROUTES
##########################
*/

app.get("/", (req, res) => {
    res.render("landing");
});

// INDEX route
app.get("/campgrounds", (req, res) => {
    Campground.find({})
        .then(campgrounds => {
            res.render("index", {campgrounds: campgrounds});
        })
        .catch(error => console.log("There was an error displaying campgrounds!"));
});

// NEW route - show form for creating new campgrounds
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

//CREATE campground
app.post("/campgrounds", (req, res) => {
    let name        = req.body.name,
        image       = req.body.image,
        description = req.body.description,
        campgrounds = {name: name, image: image, description: description}

    // Create camprgound and save to DB
    Campground.create(campgrounds)
        .then(campground => {
            res.redirect("/campgrounds");
            console.log(campground);
        })
        .catch(error => {
            console.log("Error message: " + error);
            res.redirect("/campgrounds/new");
        });
});

// SHOW - shows a specific campground
app.get("/campgrounds/:id", (req, res) => {
    // find campground with id
    let id = req.params.id;

    Campground.findById(id).populate("comments").exec()
        .then(campground => {
            // render show page
            res.render("show", {campground: campground});
        })
        .catch(error => console.log("There was an error showing the specific campground!" + error));
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server started at port ${port}`);
});