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

	// function to create a new post
	createPost: function(request, response){
		var post = new PostModel(request.body);
		post.save(function(err){
			if(err) response.send(err);
			response.send({message: "Post Created Successfully"});
		});
	},

	// function to update a post
	updatePost: function(request, response){
		PostModel.findOne({_id: request.params.id}, function(err, post){
			if(err) response.send(err);

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
	}

};