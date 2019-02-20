const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(' ')[1];
    const verified = jwt.verify(token, "pogo");
    req.userdata = verified;
    next();
    }
    catch(error) {
        return res.status(401).json({
            message : "You are not Authorized for this"
        });
    }
}