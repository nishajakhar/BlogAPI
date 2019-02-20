const Express = require("express");
const express = Express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./api/routes/user");

const blogRoutes = require("./api/routes/blog");

mongoose.connect('mongodb://localhost/blog');

express.use(bodyparser.json());
express.use('/user',userRoute);
express.use('/blog', blogRoutes);


// express.use((err, req, res, next) => {
//     console.log(err.stack);
    
//     res.sendFile(path.join(__dirname, "500.html"));
// });

module.exports = express;