const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;


router.get('/', async (req, res) => {
    const sort = req.query.sort;
    const filter = JSON.parse(req.query.filter);
    const { id,username, email, bio, q } = filter;
    let sortCriteria = sort.split('"')[1];
    if (sortCriteria === 'id') sortCriteria = '_id';
    let sortOrder = 0;
    if (sort.split('"')[3] === 'ASC') sortOrder = 1; else sortOrder = -1;
    const range = req.query.range;
    const users = await UserModel.find((q && q.trim() && { $or: [{ "username": { $regex: q } }, { "email": { $regex: q } }, { "bio": { $regex: q } }] })
        || (username && username.trim() && { "username": { $regex: username } }) || (email && email.trim() && { "email": { $regex: email } })
        || (bio && bio.trim() && { "bio": { $regex: bio } }))
        .sort([[sortCriteria, sortOrder]]).select('-password');
    let userz = users.map((usr) => {
        return { id: usr._id, username: usr.username, email: usr.email, bio: usr.bio }
    })
        if(id){   
            if (!ObjectID.isValid(id))
            return res.status(400).send('ID unknown : ' + id);   
            await UserModel.findById(id, (err, docs) => {
            if (!err && docs) res.status(200).set({ 'Access-Control-Expose-Headers': 'Content-Range', 'Content-range': '0-24/' + userz.length  }).json([{id: docs._id, username: docs.username, email: docs.email, bio: docs.bio}]);
            else console.log('ID unknown : ' + err);
        }).select('-password').clone();
        }
    else{
    res.status(200).set({ 'Access-Control-Expose-Headers': 'Content-Range', 'Content-range': '0-24/' + userz.length }).json(userz);
    }
    
})



router.get('/:id', async (req, res) => {
    // checking if the user id is valid
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);
    // req.params are parameters passed from the url
     UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send({id:docs._id,...docs});
        else console.log('ID unknown : ' + err);

    }).select('-password');
});

router.post('/',async (req, res) => {


    const { username, email, password, bio } = req.body;

    try {
        const user = await UserModel.create({ username, email, password, bio });
        res.status(201).json({ id: user._id });
    }
    catch (err) {
        const errors = signUpErrors({ err });
        res.status(400).send({ errors });
    }
})


router.put('/:id', async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        if(req.body.username) {

            await UserModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        bio: req.body.bio,
                        username: req.body.username,
                    }
                },
                { new: true, upsert: true, setdefaultsOnInsert: true },
    
            ).then((docs) => {res.status(201).send({id:docs._id,...docs}); console.log(docs)})
                .catch((err) => res.status(500).send({ Message: err }));

        }
        else { 
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setdefaultsOnInsert: true },

        ).then((docs) => {res.status(201).send({id:docs._id,...docs}); console.log(docs)})
            .catch((err) => res.status(500).send({ Message: err }));
        }
    } catch (err) {
        return res.status(500).send({ Message: err });
    }
})

router.delete('/:id',async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        await UserModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted." });
    } catch (err) {
        return res.status(500).send({ Message: err });
    }
})


module.exports = router;