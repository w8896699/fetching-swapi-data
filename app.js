var app = require('express')();
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
//TODO: add environment variable if deploy to somewhere, add process.env.     
var port =  8080;        // set port as 8080, 
var db_username =  '';
var db_password =  '';
var defaultLog    = require('./logger'); //we can use this to track status of the server
var dbConnection  = 'mongodb://localhost/SWData';
var route       = require('./route/routes');



//body-parser
// Increase postbody sizing by adding {limit: '10mb', }
//  if future we may need to send larger data set
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ extended: true})); 


var options = {
	useNewUrlParser: true,
	poolSize: 10,// Maintain up to 10 socket connections
	user: db_username,
	pass: db_password,
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};

defaultLog.accessLog.info('Connecting to:', dbConnection);
mongoose.Promise  = global.Promise;
//higher version of mongoose.connect has been depercated, so for time saving, i am using mongoose@4.10.8 
mongoose.connect(dbConnection, options).then(
	() => {

		defaultLog.accessLog.info('Database connected');
    
		defaultLog.accessLog.info('loading db models.');
		require('./api/model/starship');
		require('./api/model/people');

		app.use('/api', route);
		app.listen(port, 'localhost', function() {
			defaultLog.accessLog.info('Started server on port 8080');
		});
	},   
	err => {
		defaultLog.errorLog.info('err:', err);
		return;
	});
