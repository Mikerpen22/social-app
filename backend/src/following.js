const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://Mikerpen:uvb5auj4XWV*mgz3xfd@cluster0.v9fwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const followingSchema = require('./followingSchema');
const userSchema = require('./userSchema');
const Following = mongoose.model('following', followingSchema);
const Users = mongoose.model('user', userSchema);

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


// Dummy Data
// const following = [
//     {
//         username: 'Michael',
//         following: ["James", "Angela", "Spiderman", "Batman"],
//     },
//     {
//         username: 'Angela',
//         following: ["Lebron", "Angela", "Dune", "Ruby"],
//     }
// ]

const getFollowing = async (req, res) => {
    try {
        const userObj = await Users.find( {"username": req.params.user});
        // const req_following = await userObj.following;

        res.status(200).json(userObj[0].following);
    }
    catch(err){
        res.status(500).json(err);
    }

    // let user = following.filter((f) => (f.username == req.params.user));
    // // this return the requested user headline
    // if(!user){
    //     res.send("The user doesn't exist yet");
    // }
    // res.send({ username: user[0].username, following: user[0].following});
}

const addFollowing = async (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        // TODO: currUser follows a new person => update the database data
        let currUser = req.username;
        let currUserFollowingObj = await Users.findOne( {"username":currUser} );
        let currUserFollowing = currUserFollowingObj.following;
        currUserFollowing.push(req.params.user);
        console.log(currUserFollowing);

        await Users.updateOne({username: currUser}, {$set: {"following": currUserFollowing}});

        let currUserFollowingObjToReturn = await Users.findOne( {"username": currUser} );
        res.status(200).json(currUserFollowingObjToReturn);
    })();   // Needs () to execute

    // let user = following.filter((f) => (f.username == req.username));
    // let followingToAdd = req.params.user;
    // // add :user to the following list for the logged in user
    // user[0].following.push(followingToAdd);
    // res.send({ username: req.username, following: user[0]});

}

const delFollowing = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        // TODO: currUser follows a new person => update the database data
        let currUser = req.username;
        let currUserFollowingObj = await Users.findOne( {"username":currUser} );
        let currUserFollowing = currUserFollowingObj.following;

        var index = currUserFollowing.indexOf(req.params.user);
        currUserFollowing.splice(index, 1);

        console.log(currUserFollowing);

        await Users.updateOne({username: currUser}, {$set: {"following": currUserFollowing}});

        let currUserFollowingObjToReturn = await Users.findOne( {"username": currUser} );
        res.status(200).json(currUserFollowingObjToReturn);
    })();   // Needs () to execute
}


module.exports = (app) => {
    app.get('/following/:user?', getFollowing);
    app.put('/following/:user', addFollowing);
    app.delete('/following/:user', delFollowing);
}