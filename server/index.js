// main server file
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const postRoutes = require('../routes/postroutes');
const messages = require('../routes/messages');
const reports = require('../routes/reports');
const contacts = require('../routes/contacts');
const posts = require("../routes/posts");
const admin = require("../routes/admin");
const users = require("../routes/users")
require('dotenv').config({ path: './server/config/.env' });
require('./config/db.js');
const { checkUser } = require('../middleware/authmiddleware');
const { requireAuth } = require('../middleware/authmiddleware');
const cors = require('cors');


const app = express();

// cors
// this setting are used to give access to the api 
// in our case only http://localhost:3000 have acces to our api

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cookieparser
app.use(cookieParser());





// jwt
// jason tokens are used to identfie a session , it's saved in the cookies
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use("/api/users",users);
app.use("/api/posts",posts);
app.use('/api/messages',messages);
app.use('/api/reports',reports);
app.use('/api/contacts',contacts);
app.use("/api/admin",admin);

// server
app.listen(process.env.PORT, () => { console.log(`Listening on port ${process.env.PORT}`) });
