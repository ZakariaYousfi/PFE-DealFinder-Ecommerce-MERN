const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const ObjectID = require('mongoose').Types.ObjectId;

// get all reports for admin to see 

router.get('/', async (req,res) => {

    try {
        const reports = await Report.find();
        const reportz = reports.map((report) => {
            return {id: report._id, reportedDataId: report.reportedDataId , reportedData: report.reportedData , reportBody: report.reportBody }
        })
        res.status(200).set({'Access-Control-Expose-Headers': 'Content-Range','Content-range':'0-24/'+reportz.length}).json(reportz);
    }
    catch (err) {
        res.status(400).send(err);
    } 

})

router.post('/', async (req,res) => {

    const { reportedData, reportedDataId, reportBody } = req.body;

    try {
        const report = await Report.create({ reportedData, reportedDataId, reportBody });
        res.status(201).json(report);
    }
    catch (err) {
        res.status(400).send(err);
    } 
    
    
})

router.delete('/:id', async (req,res) => {

    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);
    try {
        await Report.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted." });
            } catch (err) {
        return res.status(500).send({ Message: err });
    }
})





module.exports = router; 