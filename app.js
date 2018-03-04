const bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      express    = require("express"),
      app        = express(),
      port       = 5050;

const db = process.env.DATABASEURL; // stored in .env file

mongoose.connect(db)
    .then(() => console.log("MongoDB connected!"))
    .catch(error => console.log("There was an error connecting to MongoDB"));

// campground schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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
        .catch(error => console.log("there was an error while adding new campground!"));
});

// SHOW - shows a specific campground
app.get("/campgrounds/:id", (req, res) => {
    // find campground with id
    Campground.findById(req.params.id)
        .then(campground => {
            // render show page
            res.render("show", {campground: campground});
        })
        .catch(error => console.log("There was an error showing the specific campground!" + error));
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server started at port ${port}`);
});