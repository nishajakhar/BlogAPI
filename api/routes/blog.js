const express = require("express");
const router = express.Router();
const blogModel = require("../model/blog_model");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");


router.post('/', checkAuth, (req,res) => {
    if(!req.body) {
        return res.status(400).send("Request body missing");
    }

    let blog = new blogModel(req.body); 
    console.log(blog);
   blog.save()
        .then(doc => {
            if(!blog || blog.length == 0){
                return res.status(500).send(doc);
            }
                return res.status(201).send(doc);
            
        })
        .catch(err => {
            res.status(500).json(err);
        });
    
});

router.get('/', (req,res) => {
    blogModel.find()
        .exec()
        .then(docs => {
            res.status(200).send(docs);
        })
        .catch(err => {
            res.status(500).json({error : err});
        });
    });

router.get('/:blogId', (req,res,next) => {
    const queryid = req.params.blogId;
    blogModel.find({
        id : queryid
    })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({error : err});
        });
});


router.put('/:blogId', checkAuth, (req,res,next) => {
    const changeProps = {};
    
    for(const [key,value] of Object.entries(req.body)){
        changeProps[key] = value;
    }

    blogModel.update({id : req.params.blogId} , {$set : changeProps})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err =>{
            res.status(500).json({error : err});
        });
    
});

router.delete('/:blogId', checkAuth, (req,res,next) => {
    blogModel.remove({id: req.params.blogId})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error : err});
        });
});



module.exports = router;