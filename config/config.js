module.exports = function (){
	return {
		db: {
			development: {
				uri: 'mongodb://ahmedonawale:pr0t0c0l@ds059821.mongolab.com:59821/postsdb',
				options: {user: '', pass: ''}
			}
		},
		port: process.env.PORT || 8000
	};
};