var config = require('./config/config')();
var mongoose = require('mongoose');

var db = mongoose.connect(config.db[process.env.NODE_ENV].uri, config.db[process.env.NODE_ENV].options, function(err){
	if(err){
		console.error('Cannot connect to mongoDB');
		console.log(err);
	}
});

var app = require('./config/express')(db);

app.listen(config.port, function () {
    console.log('Express app listening on port: ' + config.port);
});

module.exports = app;