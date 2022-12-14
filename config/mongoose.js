// require the library
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config()

//connect to the database
mongoose.connect(process.env.DEBUG === "true" ? 'mongodb://localhost/contact_list_db' : process.env.MONGODB_URI);

const db = mongoose.connection;


//error
db.on('error', console.error.bind(console, 'error connecting to db'));


// up and running then print the message
db.once('open', function () {
    console.log('successfully connected to the database');
});
