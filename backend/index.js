const auth = require('./src/auth');
const article = require('./src/article');
const profile = require('./src/profile');
const following = require('./src/following');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userSchema = require('./src/userSchema');
// const articleSchema = require('./src/articleSchema');
const profileSchema = require('./src/profileSchema');
const md5 = require('md5');
const cors = require('cors');
const connectionString = 'mongodb+srv://Mikerpen:uvb5auj4XWV*mgz3xfd@cluster0.v9fwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const corsOptions = {origin: ["https://socialappie.surge.sh",  "http://localhost:3000"], credentials: true};
const multer = require('multer');
const upCloud = require('./src/uploadCloudinary');

// Instantiate mongoDB collections
const User = mongoose.model('user', userSchema);
// const Article = mongoose.model('article', articleSchema);
const Profile = mongoose.model('profile', profileSchema);

const hello = (req, res) => {
    console.log("hello refresher");
    res.send({ hello: 'world' });
}

// Should add user to mongoDB when frontend register
const addUser = (req, res) => {
    // A lambda function
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        // TODO: add a user to the database
        let user = req.params.uname;
        await (connector.then(()=> {
            return new User({username: user, created: Date.now(), following:[user]}).save();
        }));
        res.send({name: user});
    })();   // Needs () to execute
};

const getUser = async (req, res) => {
    try {
        const req_user = await User.find( {"username": req.params.uname} );
        res.status(200).json(req_user)
    }
    catch(err){
        res.status(500).json(err);
    }
}

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.get('/', hello);
app.post('/users/:uname', addUser);

auth(app);               // 先comment掉
app.get('/users/:uname', getUser);
article(app);
profile(app);
following(app);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});
