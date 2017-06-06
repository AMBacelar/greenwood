var express = require("express");
var router  = express.Router();
var Business = require("../models/business");
var User = require("../models/user");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/contact", function(req, res) {
    res.render("contact");
});
router.get("/about", function(req, res) {
    res.render("about");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;