const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({

    reportedData : { type: String },

    reportedDataId : { type: String },

    reportBody : { type: String }

});

const Report = mongoose.model('report',ReportSchema);

module.exports = Report