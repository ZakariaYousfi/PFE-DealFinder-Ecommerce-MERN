require('../utils/errorsUtils');
const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.postInfo = (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    PostModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);

    })
};

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
}

module.exports.createPost = async (req, res) => {
    let fileName;

    if (req.file !== null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg"
            )
                throw Error("invalid file");

            if (req.file.size > 500000) throw Error("max Size");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }
        fileName = req.body.posterId + Date.now() + ".jpg";

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}`
            )
        );
    }

    const newPost = new PostModel({
        postType: req.body.postType,
        posterId: req.body.posterId,
        posterPic: req.body.posterPic,
        posterName: req.body.posterName,
        title: req.body.title,
        description: req.body.description,
        picture: req.file !== null ? "/uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: [],
        cord: req.body.cord,
        price: req.body.price,
        phonenumber: req.body.phonenumber,
        stock: req.body.stock,
        state: req.body.state,
        availability: req.body.availability,
        tags: req.body.tags,
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updatePost = (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);


    const updatedRecord = {

        title: req.body.title,
        phonenumber: req.body.phonenumber,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        state: req.body.state,
        availability: req.body.availability,
        tags: req.body.tags,
    };

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    );
};

module.exports.updatePostPic = async (req, res) => {

    try {
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        )
            throw Error("invalid file");

        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }
    const fileName = req.body.postId + Date.now() + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/posts/${fileName}`
        )
    );

    try {
        await PostModel.findByIdAndUpdate(
            req.body.postId,
            { $set: { picture: "/uploads/posts/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Post ID unknown : ' + req.params.id);

    try {
        await PostModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Post Successfully deleted." });
    } catch (err) {
        return res.status(500).send({ Message: err });
    }
}



module.exports.addToCart = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { addersToCart: req.body.id },
            },
            { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { addedToCart: req.params.id },
            },
            { new: true })
            .then((data) => res.status(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.removeFromCart = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { addersToCart: req.body.id },
            },
            { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { addedToCart: req.params.id },
            },
            { new: true })
            .then((data) => res.status(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

// comments handling
module.exports.commentPost = async (req, res) => {
    // Verify if post exists
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Post ID unknown : ' + req.params.id);

    try {
        // find the wanted poste and add a comment
        await PostModel.findByIdAndUpdate(
            // id passed in the link
            req.params.id,
            {   // push will add a comment to the comment's array without deleting any of previous commnets
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterUsername: req.body.commenterUsername,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true, upsert: true },
        ).then((docs) => res.send(docs)) // if it works do 
            .catch((err) => res.status(500).send({ message: err })); // if it does not work do
    } catch (err) {
        return res.status(400).send({ Message: err }); // error
    }
}

module.exports.editCommentPost = async (req, res) => {
    // Verify if commnet exists
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Post ID unknown : ' + req.params.id);

    try {
        // find the wanted comment to edit
        await PostModel.findById(req.params.id)
            .then(docs => {
                const theComment = docs.comments.find((comment) => comment._id.equals(req.body.commentId))

                if (!theComment) return res.status(404).send("Comment not found");
                // edit the comment
                theComment.text = req.body.text;

                return docs.save()
                    .then((docs) => res.status(200).send(docs))
                    .catch((err) => res.status(500).send(err));

            })
            .catch(err => { res.status(500).send(err) })
    } catch (err) {
        return res.status(400).send({ Message: err }); // error
    }

}

module.exports.deleteCommentPost = async (req, res) => {
    // Verify if post exists
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Post ID unknown : ' + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            // id passed in the link
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            }
        ).then((docs) => res.send(docs)) // if it works do 
            .catch((err) => res.status(400).send({ message: err })); // if it does not work do
    } catch (err) {
        return res.status(400).send({ Message: err }); // error
    }


}