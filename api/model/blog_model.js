const mongoose = require("mongoose");

let blogSchema = new mongoose.Schema({
    id : Number,
    Owner : String,
    Topic : String
});

module.exports = mongoose.model('Blog', blogSchema);

