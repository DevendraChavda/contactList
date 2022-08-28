const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./model/contact');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));


var contactList = [
    {
        name: "Devendra",
        phone: "12345656"
    },
    {
        name: "manav",
        phone: "34900233"
    },
    {
        name: "gaurav",
        phone: "3233434555"
    }
];

app.get('/', function (req, res) {

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in faching data from db");
            return;
        }

        return res.render('home', {
            title: "Contect List",
            contact_List: contacts
        });
    });
});



app.get('/prectice', function (req, res) {
    return res.render('prectice', { title: "Let's play with ejs!" });
});



app.get('/delete-contact/', function (req, res) {

    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }

        return res.redirect('back');
    }); 
    
});




app.post('/create-contact', function (req, res) {

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },
        function (err, newContact) {
            if (err) {
                console.log('error in create new contact ',err);
                return;
            }

            console.log('**********', newContact);
            return res.redirect('back');
        });

});





app.listen(port, function (err) {
    if (err) {
        console.log('error in running the server', err);
    }

    console.log('Yup! My express server is running on Port : ', port);
});