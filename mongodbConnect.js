const mongoose = require("mongoose");

const server = "localhost:27017";
const database = "blog";
const user = "nisha";
const password ="123";

//mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
let blogSchema = new mongoose.Schema({
    Question : String,
    Answer : String
});

module.exports = mongoose.model('Blog', blogSchema);

