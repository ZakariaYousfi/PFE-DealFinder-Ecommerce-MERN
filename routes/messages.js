const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Pusher = require('pusher');
require('dotenv').config({ path: './server/config/.env' });
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/userModel');


// get a user's conversations

const pusher = new Pusher ({
    appId:       process.env.PUSHER_APP_ID,
    key:         process.env.PUSHER_APP_KEY,
    secret:      process.env.PUSHER_APP_SECRET,
    cluster:     process.env.PUSHER_APP_CLUSTER,

});

router.get('/conversations/:id', (req,res)=> {

    let sender = mongoose.Types.ObjectId(req.params.id)

    Conversation.aggregate([
        {
            $lookup: {
                from: 'users',
                localField:'recipients',
                foreignField : '_id',
                as : 'recipientObj'
            },
        },
    ])
        .match({recipients: { $all : [sender]}}) // { elemMatch : { $eq: sender }}

        .project({
            'recipientObj.password' : 0,
            'recipientObj.__v': 0,
            'recipientObj.date': 0,
        })

        .exec((err,conversations) => {
            if(err) {
                console.log(err);
                res.setHeader('Content-Type','application/json');
                res.send(JSON.stringify({message :'Failure'}));
                res.sendStatus(500);
            }
            else {
                res.status(200).send(conversations);
            }
        });
});

// get the messages from a conversation

router.get('/conversations/query/:id/:to',(req,res)=>{

    let user1 = mongoose.Types.ObjectId(req.params.id);
    let user2 = mongoose.Types.ObjectId(req.params.to);

    Message.aggregate([
        {
            $lookup : {
                from: 'users',
                localField: 'receiver',
                foreignField: '_id',
                as: 'toObj',
            },
        },{
            $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'fromObj',
            },
        },
    ])

        .match({
            $or: [
                { $and : [ { receiver: user1 } , { sender: user2 }]},
                { $and: [ { receiver: user2 }, { sender: user1 }]},
            ]
        })

        .project({
            'toObj.password': 0,
            'toObj.__v':0,
            'toObj.date':0,
            'fromObj.password': 0,
            'fromObj.__v': 0,
            'fromObj.date': 0,
        })

        .exec((err,messages)=> {
            if(err){
                console.log(err);
                res.setHeader('Content-Type','application/json');
                res.send(JSON.stringify({ message: 'Failure'}));
                res.sendStatus(500);
            }
            else {
                res.send(messages);
            }
        });
});

// Post private message 

router.post('/', (req,res) => {
    
    let sender = mongoose.Types.ObjectId(req.body.id);
    let receiver = mongoose.Types.ObjectId(req.body.to);



    Conversation.findOneAndUpdate(
        {
            recipients: {
                $all: [
                    {"$elemMatch": {$eq: sender}},
                    {"$elemMatch": {$eq:receiver}}
  //                  { $elmMatch: {$eq : sender } },
    //                { $elmMatch: {$eq : receiver } },
                ],
            },
        },
        {
           recipients : [ req.body.id, req.body.to],
           by: req.body.id,
           lastMessage: req.body.content,
           date: Date.now(), 
        },
        { upsert: true, new: true, setDefaultOnInsert: true},
        function (err,conversation) {
            if(err){
                console.log(err);
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify({ message: 'Failure with conversation'}));
                res.sendStatus(500);
            }
            else {

                let message = new Message ({
                    conversation: conversation._id,
                    receiver: req.body.to,
                    sender: req.body.id,
                    content: req.body.content,                 
                });


                message.save((err,data) => {
                    if(err) {
                        console.log(err);
                        res.setHeader('Content-Type','application/json');
                        res.send(JSON.stringify({ message: 'Failure inserting message'}));
                        res.sendStatus(500);
                    }

                    else {
                        User.findById(req.body.id,(err,senderData)=>{
                            if(err) res.sendStatus(500).send({err: err}) 
                            else {
                                const sender = {
                                    id: senderData._id,
                                    img: senderData.picture,
                                    username: senderData.username
                                }

                                User.findById(req.body.to,(err,receiverData)=>{
                                    if(err) res.sendStatus(500).send({err: err}) 
                                    else {
                                    
                                    const receiver = {
                                        id: receiverData._id,
                                        img:receiverData.picture,
                                        username: receiverData.username
                                    }
                                
                                    const message =  {
                                        text: data.content,
                                        timestamp: data.date,
                                        sender: req.body.id,
                                        receiver: req.body.to
                                    }

                                    channels = ['notifications-'+req.body.id,'notifications-'+req.body.to]
                                    pusher.trigger(channels,'receive',{
                                     sender : sender,
                                     receiver: receiver,
                                     message : message,
                                   });
                                
                                   
                                res.setHeader('Content-Type','application/json');
                                res.end(
                                    JSON.stringify({
                                        message: 'Success',                                        
                                        conversationId: conversation._id,
                                    })
                                );
                                }}) 
                            } 
                        })


                    }
                });
            }
        }
    );
});

module.exports = router;