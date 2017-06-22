
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Article = require('../model/Article');
var Comment = require('../model/comment');


var app = express();
var router = express.Router();


app.use('/api', router);


var port = process.env.API_PORT || 4000;

//db config
let mongoURI = process.env.MONGODB_URI ||"mongodb://localhost/Articles";
mongoose.connect(mongoURI);
db = mongoose.connection;
db.once("open", () => {
	console.log("mongoDB is open");
});

//configure the APi to use bodyParser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// set the route path & initialize the API
app.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//retrieve all articles from the database
app.get('/articles/view',function(req, res) {
	
	Article.find(function(err, articles) {
	  if (err)
	    res.send(err);
	  console.log(articles.length)
	  res.json(articles)
	});
})

//creats new article to the database
app.post('/article/create',function(req, res) {
	var article = new Article();
	article.content = req.body.content ;
	article.save(function(err) {
	  if (err)
	    res.send(err);
	  res.json({ message: 'Add done!!' });
	});
})

/////////////Delete Article////////////

app.delete('/article/delete/:id',function(req, res) {
    //selects the article by its ID, then removes it.
    Article.remove({ _id: req.params.id }, function(err, article) {
      if (err){res.send(err);}
        
    Comment.remove({article_id:req.params.id},function(err,comment){
    	if (err) throw err
    		
    })
      res.json({ message: 'Article has been deleted' })
    })
  });


 //view Article
app.get('/article/view/:id',function(req,res){
	Article.findById(req.params.id, function(err, article) {
      if (err)
        res.send(err);
    	else{
    		//get all comment 
    		Comment.find({article_id:req.params.id},function(err,comments){
    			if (err){console.log(err)}

    			else{
    				console.log(comments)
    				article.set('comment', comments)
    			}	
    		res.json(article);
    		})
    	}
        
     
    });

})

//Add comment
app.post('/comment/create',function(req, res) {
	
	var comment = new Comment();
	comment.text = req.body.text;
	comment.article_id=req.body.article_id;
	

	comment.save(function(err) {
	  if (err)
	    res.send(err);
	  res.json({ message: 'comment successfully added!' });
	});
})




//starts the server and listens for requests
app.listen(port, function() {
  console.log('api running on port '+ port);
});