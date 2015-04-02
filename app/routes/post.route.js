var posts = require('../controllers/post.controller');

module.exports = function(router){
	router.route('/posts').get(posts.getAllPost);
	router.route('/posts/:id').get(posts.getOnePost);
	router.route('/posts').post(posts.createPost);
	router.route('/posts/:id').put(posts.updatePost);
	router.route('/posts/:id').delete(posts.deletePost);
};