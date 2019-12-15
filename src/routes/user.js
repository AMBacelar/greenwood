var express = require("express");
var router  = express.Router();
var passport = require("passport")

var User = require("../models/user");
var Business = require("../models/business");



// Auth Routes

//show register form
router.get("/register", function(req, res){
    res.render("register");
});
//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/catalogue");
        });
    });
});

//Login Routes

//show login form
router.get("/login", function(req, res){
    res.render("login");
});
//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/catalogue",
        faliureRedirect: "login"
    }), function(req, res){
}),

//logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/catalogue");
});







// SHOW - shows more info about one user
router.get("/user/:id", function(req, res){
    
    //find the user with provided ID
    User.findById(req.params.id, function(err, foundUser){
        if (err) return console.log(err);
        
            //find the businesses associated with this user
            Business.find({ 'owner.id': req.params.id }, function (err, docs) {
                if (err) return console.log(err);
                res.render("profile", { user: foundUser, 
                                        business: docs
                                    });
            });
        }
    
    );
});

//Edit edit user data route
router.get("/user/:id/edit", checkUserOwnership, function(req, res) {
    User.findById(req.params.id, function(err, foundUser){
        res.render("editProfile", {foundUser: foundUser});
    });
});

//Update user data
router.put("/user/:id", checkUserOwnership, function(req, res) {
    
    var image = req.body.image;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var website = req.body.website;
    var description = req.body._description;
    
    var newUser =       {   
                            firstName:      firstName,
                            lastName:       lastName,
                            image:          image, 
                            email:          email,
                            website:        website,
                            description:    description
                        };
    
    //find and update the correct catalogue item
    User.findByIdAndUpdate(req.params.id, newUser, function(err, updatedUser){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/user/" + req.params.id);
        }
    });
});

//Destroy user
router.delete("/user/:id", checkUserOwnership, function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/catalogue");
        }
    });
});


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
function checkUserOwnership(req, res, next) {
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
        if(err){
            res.redirect("back");
        } else {
            if(foundUser._id.equals(req.user._id)) {
                 next();
            } else {
                res.redirect("back");
            }
             
        }
    });
    } else {
        res.redirect("back");
    }
}

module.exports = router;