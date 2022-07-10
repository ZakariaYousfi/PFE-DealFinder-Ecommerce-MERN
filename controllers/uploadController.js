const UserModel = require('../models/userModel');
require('../utils/errorsUtils');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfil = async (req, res) => {
    try {
        if (req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/jpeg" &&
            req.file.detectedMimeType != "image/png") throw Error("Invalid File !")

        if (req.file.size > 500000) throw Error("max Size")

    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }

    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    )

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "/uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        ).then((docs) => res.send(docs))
            .catch((err) => res.status(500).send(err));
    } catch (err) {
        res.status(500).send(err);
    }
}