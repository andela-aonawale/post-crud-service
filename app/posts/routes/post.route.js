var posts = require('../controllers/post.controller');

module.exports = function(router){
	router.route('/posts')
	.get(posts.getAllPost)
	.post(posts.createPost);

	router.route('/post/:id')
	.get(posts.getOnePost)
	.put(posts.updatePost)
	.delete(posts.deletePost);

	router.route('/posts/author/:author')
	.delete(posts.deleteUserPosts)
	.put(posts.updatePostAuthor);
};