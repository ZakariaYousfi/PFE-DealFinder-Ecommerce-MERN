const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('../utils/errorsUtils');

// open session age 
const maxAge = 1 * 24 * 60 * 60 * 1000;
// creating the token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const randposition = [36.737232, 3.086472];

    try {
        const user = await UserModel.create({ username, email, password, position: randposition });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = signUpErrors({ err });
        res.status(200).send({ errors });
    }
}
// Inserting the token when signing In in the cookies
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = signInErrors({ err });
        res.status(200).json({ errors });

    }
}
// removing the token when loging out from the cookies
module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}