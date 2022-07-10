const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');
const ObjectID = require('mongoose').Types.ObjectId;

// get all reports for admin to see 

router.get('/', async (req,res) => {

    const sort = req.query.sort;
    const filter = JSON.parse(req.query.filter);
    const { id, posterId, posterName , title, description , tags, q } = filter;
    let sortCriteria = sort.split('"')[1];
    if(sortCriteria ==='id') sortCriteria = '_id';
    let sortOrder = 0;
    if(sort.split('"')[3]==='ASC') sortOrder = 1; else sortOrder = -1;
    const range = req.query.range;
    try {
        const posts = await postModel.find((q && q.trim() &&  {$or: [{"posterId": {$regex : q} }, {"posterName": {$regex : q} }, {"title":{$regex : q}}
        , {"description":{$regex : q}}, {"tags":{$regex : q}}]}) 
        || (posterId && posterId.trim() && { "posterId": {$regex:posterId}}) || (posterName && posterName.trim() && {"posterName" : {$regex : posterName}})
        || (title && title.trim() && {"title" : {$regex : title}}) || (description && description.trim() && {"description" : {$regex : description}}) 
        || (tags && tags.trim() && {"tags" : {$regex : tags}})
        )
    .sort([[sortCriteria,sortOrder]])
        const postz = posts.map((post) => {
            return {id: post._id, posterId: post.posterId, posterName: post.posterName , title:post.title, description: post.description, phonenumber:post.phonenumber, tags:post.tags, stock : post.stock, state: post.state, price: post.price }
        })
        if(id){   
            console.log(id)
                if (!ObjectID.isValid(id))
                return res.status(400).send('ID unknown : ' + id);   
                await postModel.findById(id, (err, post) => {
                if (!err) res.status(200).set({ 'Access-Control-Expose-Headers': 'Content-Range', 'Content-range': '0-24/' + postz.length  }).json([{id: post._id, posterId: post.posterId, posterName: post.posterName , title:post.title, description: post.description, phonenumber:post.phonenumber, tags:post.tags, stock : post.stock, state: post.state, price: post.price}]);
                else console.log('ID unknown : ' + err);
            }).select('-password').clone();
            }
        else{
            res.status(200).set({'Access-Control-Expose-Headers': 'Content-Range','Content-range':'0-24/'+postz.length}).json(postz);
        }
    }
    catch (err) {
        res.status(400).send(err);
    } 

})


router.get('/:id',async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    postModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send({id:docs._id,...docs});
        else console.log('ID unknown : ' + err);

    })
});
router.put('/:id', (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
        posterName: req.body.posterName,
        title: req.body.title,
        phonenumber: req.body.phonenumber,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        state: req.body.state,
        availability: req.body.availability,
        tags: req.body.tags,
    };

    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send({id:docs._id,...docs});
            else console.log("Update error : " + err);
        }
    );
});

router.delete('/:id',async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Post ID unknown : ' + req.params.id);

    try {
        await postModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Post Successfully deleted." });
    } catch (err) {
        return res.status(500).send({ Message: err });
    }
})





module.exports = router; 