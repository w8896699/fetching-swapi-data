var mongoose = require ('mongoose');
var _        = require ('lodash');
var defaultLog = require('../logger');

var genSchema = function (name, definition) {
	//
	// This is a general create model function that I use for mongodb, 
	//Mainly focus on handling virtual entry and add a _schemaName to every collection
	// copied from my past project
	//
	definition.methods__ = definition.methods__ || {};
	definition.virtuals__ = definition.virtuals__ || [];
	definition.indexes__ = definition.indexes__ || [];
	definition.statics__ = definition.statics__ || {};
	definition.presave__ = definition.presave__ || null;
	//
	// put aside the stuff that must happen post schema creation
	//
	var m = definition.methods__;
	var virtuals = definition.virtuals__;
	// var i = definition.indexes__;
	var s = definition.statics__;
	definition.methods__ = null;
	definition.virtuals__ = null;
	definition.indexes__ = null;
	definition.statics__ = null;
	definition.presave__ = null;
	delete definition.methods__;
	delete definition.virtuals__;
	delete definition.indexes__;
	delete definition.statics__;
	delete definition.presave__;

	var options;
	if (virtuals) {
		// http://mongoosejs.com/docs/2.7.x/docs/virtuals.html
		options = {
			toObject: {
				virtuals: true
			},
			toJSON: {
				virtuals: true
			}
		};
	}
	//
	// let every model know its schema name in the real world, this is bound
	// to come in handy somewhere, likely with permission setting since the
	// ids are unbound from their model types
	//
	definition._schemaName = {type:String, default:name, index: true};

	//
	// create the schema
	//
	var schema = new mongoose.Schema (definition, options);

	// Postsave hook
	if (s) _.extend (schema.statics, s);
	if (m) _.extend (schema.methods, m);
	if (virtuals) {
		// http://mongoosejs.com/docs/2.7.x/docs/virtuals.html
		_.forEach(virtuals, function(virtual){
			var v = schema.virtual(virtual.name);
			if(virtual.get) v.get(virtual.get);
			if(virtual.set) v.set(virtual.set);
		});
	}
	return schema;
};

module.exports = function (name, definition, collection) {
	if (!name || !definition) {
		//TODO use default log and store error in db
		defaultLog.errorLog.info ('No name or definition supplied when building schema');
		return;
	}
	return mongoose.model (name, genSchema  (name, definition), collection);
};