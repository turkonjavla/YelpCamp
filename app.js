const bodyParser = require("body-parser"),
      express    = require("express"),
      app        = express(),
      port       = 5050;

var campgrounds = [
    {
        name: "Yosemite National Park",
        image: "https://lh6.googleusercontent.com/proxy/OcqYcF8IRbYd5kD9R8dffwVIIQDEYI6pYJGHgNQi_Jvf64vDpNJuM69Z5TR7q37o08indq8V_QS_peThRFoY5DStlL-PSbyG9NdAXwmfY8kMLStZHNpvDIU9ovqRN60FMwF2Qobh7qz1ThSd=s1536-k-no"
    }
];
    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/index", (req, res) => {
    res.render("index", {campgrounds: campgrounds});
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server started at port ${port}`);
});