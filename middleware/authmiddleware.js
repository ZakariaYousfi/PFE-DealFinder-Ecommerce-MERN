const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// this function check if the user token is availible in the cookies before opning a session
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                // if not availble disconnect the user in 1 ml sec
                res.locals.user = null;
                //res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}
// this function check if the user token is availible in the cookies every time the user refresh the pages
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        })
    } else {
        console.log('No token');
    }
}