const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const ObjectID = require('mongoose').Types.ObjectId;

// get all reports for admin to see 

router.get('/', async (req,res) => {

    try {
        const contacts = await Contact.find();
        const contactz = contacts.map((contact) => {
            return {id: contact._id, contactName: contact.contactName , contactEmail: contact.contactEmail , contactBody: contact.contactBody }
        })
        res.status(200).set({'Access-Control-Expose-Headers': 'Content-Range','Content-range':'0-24/'+contactz.length}).json(contactz);
    }
    catch (err) {
        res.status(400).send(err);
    } 

})

router.post('/', async (req,res) => {

    const { contactName, contactEmail, contactBody } = req.body;

    try {
        const report = await Contact.create({ contactName, contactEmail, contactBody });
        res.status(201).json(report);
        console.log("admin was contacted")
    }
    catch (err) {
        res.status(400).send(err);
    } 
    
})


router.delete('/:id', async (req,res) => {

    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);
    try {
        await Contact.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted." });
            } catch (err) {
        return res.status(500).send({ Message: err });
    }
})




module.exports = router; 