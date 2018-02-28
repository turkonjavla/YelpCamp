const bodyParser = require("body-parser"),
      express    = require("express"),
      app        = express(),
      port       = 5050;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/index", (req, res) => {
    res.render("index")
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server started at port ${port}`);
});