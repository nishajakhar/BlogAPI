const Express = require("express");
const express = Express();
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const blogRoutes = require("./api/routes/blog");

mongoose.connect('mongodb://localhost/blog');

express.use(bodyparser.json());

express.use('/', blogRoutes);

// express.use((err, req, res, next) => {
//     console.log(err.stack);
    
//     res.sendFile(path.join(__dirname, "500.html"));
// });

module.exports = express;