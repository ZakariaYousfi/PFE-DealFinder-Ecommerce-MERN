const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');



// open session age 
const maxAge = 1 * 24 * 60 * 60 * 1000;
// creating the token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}


router.post('/authenticate', async (req,res) => {
    const { username, password } = JSON.parse(req.body.body);
    console.log(username,password);   
        try {
            const admin = await Admin.login(username, password);
            const token = createToken(admin._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge });
            res.status(200).json({ token: token });
        }
        catch (err) {
            console.log(err)
            const errors = signInErrors({ err });
            res.status(400).json({ errors });  
        }  
})

router.post('/register', async (req,res) => { 
    const { username, email, password, secretKey } = req.body;
    if(secretKey==="theGoldenKey") {
        try {
            const admin = await Admin.create({ username, email, password });
            res.status(201).json({ admin: admin._id });
        }
        catch (err) {
            const errors = signUpErrors({ err });
            res.status(200).send({ errors });
        }
    }
})


module.exports = router;