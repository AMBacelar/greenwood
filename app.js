var     express             = require("express");
var     mongoose            = require("mongoose");
mongoose.Promise = global.Promise;
var     app                 = express();
var     bodyParser          = require("body-parser");
var     passport            = require("passport");
var     LocalStrategy       = require("passport-local");
var     methodOverride      = require("method-override");

var     User                = require("./models/user");

var     businessRoutes      = require("./routes/catalogue"),
        userRoutes          = require("./routes/user"),
        indexRoutes         = require("./routes/index");

console.log(process.env.DATABASEURL);
mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//passport configuration

app.use(require("express-session")({
    secret: "testing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//////////////////////////////////////////////////////////////
///////////////          ROUTES         //////////////////////
//////////////////////////////////////////////////////////////

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/catalogue/", businessRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started, use Ctrl + C to exit!");
});