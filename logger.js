var winston = require('winston');
var path    = require('path');

// Set this to whatever, by default the path of the script.
var logPath = __dirname;

const tsFormat = () => (new Date().toISOString());

const errorLog = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: path.join(logPath, 'errors.log'),
			timestamp: tsFormat,
			level: 'info'})
	]
});

const accessLog = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: path.join(logPath, 'access.log'),
			timestamp: tsFormat,
			level: 'info'})
	]
});


module.exports = {
	errorLog: errorLog,
	accessLog: accessLog
};