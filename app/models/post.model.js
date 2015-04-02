var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: {type: String, required: true},
	author: {type: String, required: true},
	post: {type: String, required: true},
	created_on: Date,
	updated_on: Date,
	admin: Boolean
});

postSchema.pre('save', function(next){
	var currentDate = new Date();

	this.updated_on = currentDate;

	if(!this.created_at){
		this.created_on = currentDate;
	}
	next();
});

module.exports = mongoose.model('Post', postSchema, 'posts');