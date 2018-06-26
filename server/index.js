require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const ctrl = require('./controller');
const session = require('express-session');
const authController = require('./authController');
const path = require("path");
const {test} = require('./function');
const cloudinary = require('cloudinary');


const PORT = 3500;



const app = express();






app.use(express.static(path.join(__dirname, '/../build')));


app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 60 * 24 * 14
    }
}))

massive(process.env.CONNECTION_STRING).then(database =>{
    app.set('db', database);
    
}).catch(err => console.log('Connection error -------------', err));


app.get('/api/auth/callback', authController.login);
app.get('/api/user', authController.getUser);
app.post('/api/logout', authController.logout);
app.put('/api/user', authController.editProfile);
app.post('/api/createCountryBlogPost',ctrl.createCountryBlogPost);
app.get('/api/getCountryBlogPost/:countries_id', ctrl.getCountryBlogPost);
app.put('/api/editCountryBlogPost/:post_id', ctrl.editCountryBlogPost);
app.delete('/api/deleteCountryBlogPost/:post_id', ctrl.deleteCountryBlogPost);
app.post('/api/createBackpackerBlogPost',ctrl.createBackpackerBlogPost);
app.get('/api/getBackpackerBlogPost/:topic_id', ctrl.getBackpackerBlogPost);
app.put('/api/editBackpackerBlogPost/:post_id', ctrl.editBackpackerBlogPost);
app.delete('/api/deleteBackpackerBlogPost/:post_id', ctrl.deleteBackpackerBlogPost);
app.get('/api/getCountries/', ctrl.getCountries);
app.get('/api/getCities/:id', ctrl.getCities);
app.get('/api/getCountry/',ctrl.getCountry);
app.get('/api/getBackpackerBlogTopics/',ctrl.getBackpackerBlogPostTopics);






app.get('/api/upload', (req, res) => {

    const timestamp = Math.round((new Date()).getTime() / 1000);
    
    const api_secret  = process.env.CLOUDINARY_SECRET_API;

    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);

    const payload = {
        signature: signature,
        timestamp: timestamp
    };
        res.json(payload);

})


app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})



const server = app.listen(PORT, () => {
    console.log(`Hey your server is up and working on port ${PORT}🚀`)
})


// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../build/index.html'));
//   })

