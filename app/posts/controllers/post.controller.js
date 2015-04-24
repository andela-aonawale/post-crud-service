var PostModel = require('../models/post.model');

module.exports = {
	// function to retrive all post
	getAllPost: function(request, response){
		PostModel.find(function(err, posts){
			if(err) response.send(err);
			response.json(posts);
		});
	},

	// function to retrieve a single post
	getOnePost: function(request, response){
		PostModel.findOne({_id: request.params.id}, function(err, post){
			if(err) response.send(err);
			response.json(post);
		});
	},

	updatePostAuthor: function(request, response){
		PostModel.find({author: request.params.author}, function(err, posts){
			if(err) response.send(err);
			posts.forEach(function(post){
    		post.author = request.body.username;
    		post.save(function(err){
					if(err) response.send(err);
				});
			});
			response.json({message: "Post Author Updated Successfully"});
		});
	},

	// function to create a new post
	createPost: function(request, response){
		if(!request.body.title || !request.body.author || !request.body.post){
			response.json({message: "Invalid Post"});
		}else{
			var post = new PostModel(request.body);
			post.save(function(err){
				if(err) response.json({error: "Invalid Post"});
				response.json({message: "Post Created Successfully"});
			});
		}
	},

	// function to update a post
	updatePost: function(request, response){
		PostModel.findOne({_id: request.params.id}, function(err, post){
			if(err) response.send(err);
			request.body.token ? delete request.body.token : console.log("no author");
			for(prop in request.body){
				post[prop] = request.body[prop];
			}

			post.save(function(err){
				if(err) response.send(err);
				response.json({message: "Post Updated Successfully"});
			});

		});
	},

	// function to delete a post
	deletePost: function(request, response){
		PostModel.remove({_id: request.params.id}, function(err){
			if(err) response.send(err);
			response.json({message: "Post Deleted Successfully"});
		});
	},

	deleteUserPosts: function(request, response){
		PostModel.remove({author: request.params.author}, function(err){
			if(err) response.send(err);
			response.json({message: "Post Deleted Successfully"});
		});
	}

};