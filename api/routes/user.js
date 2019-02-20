const express = require("express");
const router = express.Router();
const userModel = require("../model/user_model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post('/signup', (req, res) => {
    console.log("req.body", req.body.email)
    if (!req.body) {
        return res.status(400).send("Request body missing");
    }

    userModel.find({ email: req.body.email })
        .exec()
        .then(result => {
            if (result.length > 0) {
                return res.status(409).json({
                    message: "User Already exist"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        let user = new userModel();
                        user.id = req.body.id;
                        user.name = req.body.name;
                        user.email = req.body.email;
                        user.password = hash;

                        user.save()
                            .then(result => {
                                if (!result || result.length == 0) {
                                    return res.status(500).send(result);
                                }
                                return res.status(201).send(resut);

                            })
                            .catch(err => {
                                res.status(500).json(err);
                            });
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({ Error: err });
        });
        

    });

router.post('/login',(req, res) => {
    userModel.find({email : req.body.email})
        .exec()
        .then(user => {
            if(user.length == 0){
                return res.status(401).send("User with email does not exist. Please try again");
            }
                bcrypt.compare(req.body.password , user[0].password, (err, result) => {
                    if(err){
                        return res.status(401).send("Password does not match");
                    }
                    if(result){
                        const token = jwt.sign({
                            email : user[0].email,
                            id : user[0].id
                        }, "pogo", {
                            expiresIn : "1h"
                        });
                        return res.status(200).json({
                            message : "Auth Successful",
                            token : token});
                    }
                });
                
        })
        .catch();
});
// router.get('/blog', (req,res) => {
//     blogModel.find()
//         .exec()
//         .then(docs => {
//             res.status(200).send(docs);
//         })
//         .catch(err => {
//             res.status(500).json({error : err});
//         });
//     });

// router.get('/blog/:blogId', (req,res,next) => {
//     const queryid = req.params.blogId;
//     blogModel.find({
//         id : queryid
//     })
//         .exec()
//         .then(doc => {
//             res.status(200).json(doc);
//         })
//         .catch(err => {
//             res.status(500).json({error : err});
//         });
// });


// router.put('/blog/:blogId', (req,res,next) => {
//     const changeProps = {};

//     for(const [key,value] of Object.entries(req.body)){
//         changeProps[key] = value;
//     }

//     blogModel.update({id : req.params.blogId} , {$set : changeProps})
//         .exec()
//         .then(result => {
//             res.status(200).json(result);
//         })
//         .catch(err =>{
//             res.status(500).json({error : err});
//         });

// });

// router.delete('/blog/:blogId', (req,res,next) => {
//     blogModel.remove({id: req.params.blogId})
//         .exec()
//         .then(result => {
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             res.status(500).json({error : err});
//         });
// });



module.exports = router;