'use strict';

var express = require('express'),
	posts = require('./mock/posts.json');

var postsLists = Object.keys(posts).map(function(value){
											return posts[value];
										});

var app = express();

app.use('/static', express.static(__dirname+'/public'));
app.set('view engine', 'jade'); //what type of template
app.set('views', __dirname + '/templates'); //where are templates found in file structure; __dirname makes it relative to file (important because src and deploy is different)

app.get('/', function(req, res){
	//res.send('<h1>i love you more!</h1>');
	res.render('index', {path:req.url});
});

app.get('/blog/:title?', function(req, res){
	var title = req.params.title;
	if(title === undefined){
		res.status(503); //'service unavailable' - don't show to search engines
		//res.send("this page is under construction");
		res.render('blog',{posts:postsLists});
	}else{
		var post = posts[title] || {};
 		//res.send(post);
 		res.render('post', { post: post });
	}
});

app.get('/pages/:name?', function(req, res){
	var page = req.params.name;
	var post = {title:page};
 	res.render('post', { post: post });
});

app.get('/posts', function(req, res){
	if(req.query.raw){
		res.json(posts);
	}else{
		res.json(postsLists);
	}
});

app.get('/test', function(req, res){
	res.send('<h1><center>i love you more!</center></h1>');
});
app.listen(3000, function(){
	console.log('the front-end server is running on port 3000!')
});

