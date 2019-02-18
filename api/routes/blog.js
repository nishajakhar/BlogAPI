const express = require("express");
const router = express.Router();
const blogModel = require("../../mongodbConnect");


router.post('/blog',(req,res) => {
    if(!req.body) {
        return res.status(400).send("Request body missing");
    }

    let model = new blogModel(req.body); 

   model.save()
   .then(doc => {
        if(!model || model.length == 0){
            return res.status(500).send(doc);
        }
            return res.status(201).send(doc);
        
    })
    .catch(err => {
        res.status(500).json(err);
    });
    
});

// router.get('/blog', (req,res) => {
//     res.json({
//         message : "Post Request for blog"
//     });
// });

// router.get('/blog/:blogId', (req,res,next) => {
//     const id = req.params.blogId;
//     res.status(200).json({
//         message : "Get Request for one particular blog",
//         id : id
//     });
// });
// router.post('/blog/:blogId', (req,res,next) => {
//     res.status(200).json({
//         message : "Post Request for one particular blog"
//     });
// });

// router.put('/blog/:blogId', (req,res,next) => {
//     res.status(200).json({
//         message : "Update Request for one particular blog"
//     });
// });

// router.delete('/blog/:blogId', (req,res,next) => {
//     res.status(200).json({
//         message : "delete Request for one particular blog"
//     });
// });



module.exports = router;