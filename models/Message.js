const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({

    conversation : { type : Schema.Types.ObjectId , ref : 'conversations'},
    
    sender : { type : Schema.Types.ObjectId, ref :'user', },

    receiver : { type : Schema.Types.ObjectId, ref :'user', },

    content: { type: String, required: true, },

    date : { type: String, default: Date.now, }, // should use timestamps?
    
    // picture : String tbd if to user or not

});

const Message = mongoose.model('messages',MessageSchema);

module.exports = Message

