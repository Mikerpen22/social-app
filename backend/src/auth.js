const md5 = require('md5')
var cookieParser = require('cookie-parser');
let sessionUser = {};
let userObjs = {};

function isLoggedIn(req, res, next) {
    if (!req.cookies) {
        return res.sendStatus(401);
    }

    let sid = req.cookies["sid"];
    // no sid for cookie key
    if (!sid) {
        return res.sendStatus(401);
    }

    let username = sessionUser[sid];
    // no username mapped to sid
    if (username) {
        req.username = username;
        next();
    }
    else {
        return res.sendStatus(401)
    }
}

function changePassword(req, res){
    // Users not logged in cannot change password
    if(!req.cookies){
        return res.sendStatus(401);
    }
    let sid = req.cookies["sid"];
    if(!sid){
        return res.sendStatus(401);
    }
    let username = sessionUser[sid];
    let user = userObjs[username];

    // User supply password to change 
    let password = req.body.password;
    if(!password){
        return res.sendStatus(400);
    }
    // Retrieve salt from userObjs to hash the password provided
    // Update the new hash stored on the server
    let hash = md5(user.salt + password);
    userObjs[username].hash = hash;


    let msg = {username: username, result: 'success'};
    res.send(msg);
}

async function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }

    let user = userObjs[username];
    if (!user) {
        return res.sendStatus(401)
    }

    // TODO: create hash using md5, user salt and request password, check if hash matches user hash
    let hash = md5(user.salt + password);

    if (hash === user.hash) {
        // TODO: create session id, use sessionUser to map sid to user username
        let sid = hash; // CHANGE THIS!
        sessionUser[sid] = username;

        // Adding cookie for session id
        res.header('Access-Control-Allow-Credentials',true)
        res.cookie("sid", hash, { maxAge: 3600 * 1000, httpOnly: true});
        let msg = {username: username, result: 'success'};
        res.send(msg);
    }
    else {
        res.sendStatus(401);
    }
}

function logout(req, res){
    // Clear the session id cookie
    delete sessionUser['sid'];
    res.clearCookie('sid'); // cookieKey = sid
    res.sendStatus(200);
}

function register(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }

    let salt = username + new Date().getTime();
    let hash = md5(salt + password) // TODO: Change this to use md5 to create a hash

    userObjs[username] =  {salt: salt, hash: hash} // TODO: Change this to store object with username, salt, hash
    let msg = {username: username, result: 'success'};
    res.header('Access-Control-Allow-Credentials',true);
    res.send(msg);
}


module.exports = (app) => {
    app.use(cookieParser());
    app.post('/register', register);
    app.post('/login', login);
    app.use(isLoggedIn);
    app.put('/password', changePassword);
    app.put('/logout', logout);
}

