var mongoose    = require("mongoose");

var     businessSchema = new mongoose.Schema({
    name:           String,
    image:          String,
    category:       Array,
    location:       String,
    dateCreated:    String,
    phoneNumber:    String,
    email:          String,
    website:        String,
    description:    String,
    owner: {
       id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
       },
       username: String
    }
});

module.exports = mongoose.model("Business", businessSchema);