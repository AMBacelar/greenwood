var express = require("express");
var router  = express.Router();

var Business = require("../models/business");


router.get("/", function(req, res) {
    //generate query object based on availability of value
    var filter = {};
    if(req.query) {
        if( req.query.name !== undefined ) {
            const regex = new RegExp(escapeRegex(req.query.name), 'gi');
            filter["name"] = regex;
        }
        if( req.query.category !== undefined ) {
            var catArr = [];
            for(var i = 0; i < req.query.category.length; i++) {
                var catArrObj = {};
                        catArrObj["category"] = req.query.category[i];
                        catArr.push(catArrObj);
                    }
            filter["$or"] = catArr;
        }
        Business.find(filter, function(err, allBusinesses) {
        if(err){
            console.log(err);
        } else {
            res.render("catalogue/catalogue", {business:allBusinesses});
            catArr = [];
        }
    });
    } else {
    //get all businesses from db
        Business.find({}, function(err, allBusinesses) {
            if(err){
                console.log(err);
            } else {
                res.render("catalogue/catalogue", {business:allBusinesses});
            }
        });
    }
});



router.post("/", isLoggedIn, function(req, res) {
    //get data from the form and add to business database
    var name = req.body.name;
    var image = req.body.image;
    var category = req.body.category;
    var location = req.body._location;
    var dateCreated = req.body.dateCreated;
    var phoneNumber = req.body.phoneNumber;
    var email = req.body.email;
    var website = req.body.website;
    var description = req.body._description;
    
    var owner = {
                    id: req.user._id,
                    username: req.user.username
    };
    
    var newBusiness =   {   name:           name, 
                            image:          image, 
                            category:       category, 
                            location:       location,
                            owner:          owner,
                            dateCreated:    dateCreated,
                            phoneNumber:    phoneNumber,
                            email:          email,
                            website:        website,
                            description:    description
                        };
                        
    Business.create(newBusiness, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // if successful, redirect back to catalogue page
            res.redirect("catalogue/catalogue");
        }
    });
});

router.get("/new", isLoggedIn, function(req, res) {
    res.render("catalogue/new");
});

// SHOW - shows more info about one business
router.get("/:id", function(req, res){
    //find the business with provided ID
    Business.findById(req.params.id, function(err, foundBusiness){
        if(err){
            console.log(err);
        } else {
            //render show template with that business
            res.render("catalogue/show", {business: foundBusiness});
        }
    });
});

//Edit Campground route
router.get("/:id/edit", checkBusinessOwnership, function(req, res) {
    Business.findById(req.params.id, function(err, foundBusiness){
        res.render("catalogue/edit", {catalogueID: foundBusiness});
    });
});

//Update Campground route
router.put("/:id", checkBusinessOwnership, function(req, res) {
    
    var name = req.body.name;
    var image = req.body.image;
    var category = req.body.category;
    var location = req.body._location;
    var phoneNumber = req.body.phoneNumber;
    var email = req.body.email;
    var website = req.body.website;
    var description = req.body._description;
    
    var newBusiness =   {   name:           name, 
                            image:          image, 
                            category:       category, 
                            location:       location,
                            phoneNumber:    phoneNumber,
                            email:          email,
                            website:        website,
                            description:    description
                        };
    
    //find and update the correct catalogue item
    Business.findByIdAndUpdate(req.params.id, newBusiness, function(err, updatedCatalogue){
        if(err){
            res.redirect("/catalogue");
        } else {
            res.redirect("/catalogue/" + req.params.id);
        }
    });
});

//Destroy Route
router.delete("/:id", checkBusinessOwnership, function(req, res){
    Business.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/catalogue");
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

function checkBusinessOwnership(req, res, next) {
    if(req.isAuthenticated()){
        //does user own the campground?
        Business.findById(req.params.id, function(err, foundBusiness){
        if(err){
            res.redirect("back");
        } else {
            //does user own the campground?
            if(foundBusiness.owner.id.equals(req.user._id)) {
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;