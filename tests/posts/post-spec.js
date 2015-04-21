var request = require('supertest');
var server = require('../../server');
var mongoose = require('mongoose');
var PostModel = mongoose.model('Post');
var post;


	describe('test each controller function', function(){

		beforeEach(function(done){

		post = new PostModel({
			id: '55229454845b8c11009003ee',
			title: 'AngularJS',
			author: 'Google',
			post: 'awesoame framework'
		});

		post.save(function(err){
			if(err) console.log(err);
		});

		done();
	});

	afterEach(function(done){

		PostModel.remove(function(err){
			if(err) console.log(err);

		});

		done();
	});


		it('should be able to get the list of posts', function(done){
			request(server)
			.get('/api/v1/posts-test')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if(err) console.log(err);
				expect(res.body.length).toEqual(1);
				expect(res.body[0]).toEqual(jasmine.objectContaining({
					title: 'AngularJS',
					author: 'Google',
					post: 'awesome framework'
				}));

				done();

			});

		});

		it('should be able to accept post request', function(done){
			request(server)
			.post('/api/v1/posts-test')
			.send({title: 'Java', author: 'Oracle', post: 'some cool language'})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
					if(err) console.log(err);
					expect(res.body).toEqual({message: "Post Created Successfully"});
					done();
			});
			
		});

		it('should delete a post when request is made to /posts/id', function(done){
			request(server)
			.delete('/api/v1/posts-test/55229454845b8c11009003ee')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if(err) console.log(err);
				expect(res.body).toEqual({message: "Post Deleted Successfully"});
				done();
			});
			
		});



		it('should update a post', function(done){
			request(server)
			.put('/api/v1/posts-test/55229454845b8c11009003ee')
			.send({
				title: 'Swift',
				author: 'iOS'
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if(err) console.log(err);
				expect(res.body).toEqual({message: "Post Updated Successfully"});
				done();

			});
			
		});

		it('should retrieve a single post', function(done){
			request(server)
			.get('/api/v1/posts-test/55229454845b8c11009003ee')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if(err) console.log(err);
				expect(res.body.length).toEqual(1);
				expect(res.body[0]).toEqual(jasmine.objectContaining({
					title: 'AngularJS',
					author: 'Google',
					post: 'awesome framework'
				}));
				done();
			});
		});


	});