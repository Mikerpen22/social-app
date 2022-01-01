const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://Mikerpen:uvb5auj4XWV*mgz3xfd@cluster0.v9fwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const articleSchema = require('./articleSchema');
const userSchema = require('./userSchema');
const uploadImage = require('./uploadCloudinary');
const Article = mongoose.model('article', articleSchema);
const Users = mongoose.model('user', userSchema);

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const getArticles = async (req, res) => {
    try {
            (async () => {
                const article = await Article.findById(req.params.id);
                let reqAuthor = article.author;
                // const article_by_author = await Article.find( { "author": reqAuthor} )
                const currUsrObj = await Users.find( {'username': reqAuthor} );
                // setTimeout(()=>{console.log(currUsrObj)}, 5000);
                const currUsrFollowing = currUsrObj[0].following;
                const postsToReturn = await Article.find( {'author': {$in: currUsrFollowing }} );
                // const article_by_author = await Article.find( { "author": reqAuthor} )
                res.status(200).json(postsToReturn)
            })();   // Needs () to execute
            
    }
    catch(err){
        res.status(500).json(err);
    }
};


const modArticle = (req, res) => {
    let req_id = req.params.id;
    articles.filter((p) => (p._id == req_id))[0].text = req.body.text;
    let filteredArticles = articles.filter((p) => (p._id == req_id));
    res.send({articles: filteredArticles});
}

const addArticles = async (req, res) => {
    // let post = req.body.text;
    
    // let post_image = req.body.image;
    // Adding new post to mongo
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        // TODO: add an article to the database
        // let article = req.body.text;
        await(connector.then(() => {
            return new Article({_id: (Math.random()+1)*1000, author: req.username, text: req.body.text, created: Date.now(), image:String(req.fileurl)}).save();
        }));
        // Return articles to display for this moment
        const all_articles_for_me = await Article.find({"author": req.username});
        console.log(all_articles_for_me);
        res.status(200).json(all_articles_for_me)
    })();

};


module.exports = (app) => {
    app.get('/articles/:id?', getArticles);
    app.put('/articles/:id', modArticle);
    app.post('/article', uploadImage('image'), addArticles);
}