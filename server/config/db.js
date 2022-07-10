// necessary config to connect mongo DB
const mongoose = require("mongoose");
const URI = process.env.MONGODB_URL;
mongoose.connect(
    URI
)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));