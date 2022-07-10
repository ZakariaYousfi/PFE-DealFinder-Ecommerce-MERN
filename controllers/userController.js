
const UserModel = require('../models/userModel');
const ObjectID = require('mongoose').Types.ObjectId;

// this is a test function that returns all the users in the db
module.exports.getUsers = async (req, res) => {
    // we remove the password for security purpss
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.getAllUsers = async (req, res) => {
    const sort = req.query.sort;
    const filter = JSON.parse(req.query.filter);
    const { username, email, bio, q } = filter;
    let sortCriteria = sort.split('"')[1];
    if (sortCriteria === 'id') sortCriteria = '_id';
    let sortOrder = 0;
    if (sort.split('"')[3] === 'ASC') sortOrder = 1; else sortOrder = -1;
    const range = req.query.range;
    const users = await UserModel.find((q && q.trim() && { $or: [{ "username": { $regex: q } }, { "email": { $regex: q } }, { "bio": { $regex: q } }] })
        || (username && username.trim() && { "username": { $regex: username } }) || (email && email.trim() && { "email": { $regex: email } })
        || (bio && bio.trim() && { "bio": { $regex: bio } }))
        .sort([[sortCriteria, sortOrder]]).select('-password');
    const userz = users.map((usr) => {
        return { id: usr._id, username: usr.username, email: usr.email, bio: usr.bio }
    })
    res.status(200).set({ 'Access-Control-Expose-Headers': 'Content-Range', 'Content-range': '0-24/' + userz.length }).json(userz);
}

module.exports.postUser = async (req, res) => {


    const { username, email, password, bio } = req.body;

    try {
        const user = await UserModel.create({ username, email, password, bio });
        res.status(201).json({ id: user._id });
    }
    catch (err) {
        const errors = signUpErrors({ err });
        res.status(400).send({ errors });
    }
}
// this function use the id of the user and return all his info
module.exports.userInfo = (req, res) => {
    // checking if the user id is valid
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);
    // req.params are parameters passed from the url
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);

    }).select('-password');
};

// this function updates the bio of the user, it identifies the user by his id
module.exports.updateUser = async (req, res) => {
    //console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setdefaultsOnInsert: true },

        ).then((docs) => res.status(201).send(docs))
            .catch((err) => res.status(500).send({ Message: err }));
    } catch (err) {
        return res.status(500).send({ Message: err });
    }
}
// this function sets the geo location of the user when cliking the button find me on the front-end
module.exports.updatePosition = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);
    // req.body are infos passed from the front-end 
    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    position: req.body.position
                }
            },
            { new: true, upsert: true, setdefaultsOnInsert: true },

        ).then((docs) => res.status(201).send(docs))
            .catch((err) => res.status(500).send({ Message: err }));
    } catch (err) {
        return res.status(500).send({ Message: err });
    }
}
// this function identfies the user by id and deletes him
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        await UserModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted." });
    } catch (err) {
        return res.status(500).send({ Message: err });
    }
}

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    if (!ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send('ID unknown : ' + req.body.idToFollow);

    try {
        // add to the follewer list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },

        ).then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(400).json({ Message: err }));

        // add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },

        ).then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(400).json({ Message: err }));

    } catch (err) {
        return res.status(500).send({ Message: err });
    }
}

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    if (!ObjectID.isValid(req.body.idToUnFollow))
        return res.status(400).send('ID unknown : ' + req.body.idToUnFollow);

    try {
        // Delete from the follewer list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upsert: true },

        ).then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(400).json({ Message: err }));

        // Delete from the following list
        await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },

        ).then((docs) => res.send(docs))
            .catch((err) => res.status(400).json({ Message: err }));
    } catch (err) {
        return res.status(500).send({ Message: err });
    }
}