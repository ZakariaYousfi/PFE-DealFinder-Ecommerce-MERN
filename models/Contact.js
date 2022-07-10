const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({

    contactName : { type: String },

    contactEmail: { type: String },

    contactBody: { type: String }

});

const Contact = mongoose.model('contact',ContactSchema);

module.exports = Contact