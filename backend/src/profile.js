// this is profile.js which contains all user profile 
// information except passwords which is in auth.js
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://Mikerpen:uvb5auj4XWV*mgz3xfd@cluster0.v9fwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const profileSchema = require('./profileSchema');
const userSchema = require('./userSchema');
const Profile = mongoose.model('profile', profileSchema);
const Users = mongoose.model('user', userSchema);
const uploadImage = require('./uploadCloudinary');



const getHeadline = async (req, res) => {
    try {
        const user_req = await Users.findOne( { "username" : req.params.user} );
        res.send( {username: user_req.username, headline: user_req.headline} )
        // res.status(200).json(user_req.headline)
    }
    catch(err){
        res.status(500).json(err);
    }
}

const updateHeadline = async (req, res) => {
    try{
        await Users.updateOne({username: req.username}, {$set: {"headline": req.body.headline}});
        const userToReturn = await Users.findOne( {username: req.username} );
        let userToReturnObj = {"username" : req.username, "headline": req.body.headline}; 
        res.status(200).json(userToReturnObj)
    }
    catch(e){
        res.status(500).json(err);
    }
}

const getEmail = async (req, res) => {
    try {
        const user_req = await Users.findOne( { "username" : req.params.user} );
        res.send( {username: user_req.username, email: user_req.email} );
    }
    catch(err){
        res.status(500).json(err);
    }
}

const updateEmail = async (req, res) => {
    try{
        await Users.updateOne({username: req.username}, {$set: {"email": req.body.email}});
        const userToReturn = await Users.findOne( {username: req.username} );
        let userToReturnObj = {"username" : req.username, "email": req.body.email}; 
        res.status(200).json(userToReturnObj)
    }
    catch(e){
        res.status(500).json(err);
    }
}

const getDateOfBirth = async (req, res) => {
    try {
        const user_req = await Users.findOne( { "username" : req.params.user} );
        res.send( {username: user_req.username, headline: user_req.dob} );
        // res.status(200).json(user_req.headline)
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getZipcode = async (req, res) => {
    try {
        const user_req = await Users.findOne( { "username" : req.params.user} );
        res.send( {username: user_req.username, headline: user_req.zipcode} );
    }
    catch(err){
        res.status(500).json(err);
    }
}

const updateZipcode = async (req, res) => {
    try{
        await Users.updateOne({username: req.username}, {$set: {"zipcode": req.body.zipcode}});
        const userToReturn = await Users.findOne( {username: req.username} );
        let userToReturnObj = {"username" : req.username, "zipcode": req.body.zipcode}; 
        res.status(200).json(userToReturnObj)
    }
    catch(e){
        res.status(500).json(err);
    }
}

const getAvatar = async (req, res) => {
    try {
        const user_req = await Users.findOne( { "username" : req.params.user} );
        res.send( {username: user_req.username, avatar: user_req.avatar} );
    }
    catch(err){
        res.status(500).json(err);
    }
}


// TODO: implement uploading image
const updateAvatar = async (req, res) => {
    try{
        await Users.updateOne({username: req.username}, {$set: {"avatar": req.fileurl}});
        const userToReturn = await Users.findOne( {username: req.username} );
        let userToReturnObj = {"username" : req.username, "avatar": req.fileurl}; 
        res.status(200).json(userToReturnObj)
    }
    catch(e){
        res.status(500).json(err);
    }
}

module.exports = (app) => {
    app.get('/headline/:user?', getHeadline);
    app.put('/headline', updateHeadline);
    app.get('/email/:user?', getEmail);
    app.put('/email', updateEmail);
    app.get('/dob/:user?', getDateOfBirth);
    app.get('/zipcode/:user?', getZipcode);
    app.put('/zipcode', updateZipcode);
    app.get('/avatar/:user?', getAvatar);
    app.put('/avatar', uploadImage('avatar'), updateAvatar)
}