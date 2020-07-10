var mongoose    = require('mongoose');
var defaultLog    = require('../logger');

module.exports =  async function(urls,param){
	// 1. first way, 
	//return the whole promise, use $in to $in operator to pass in an array to find and get a large set of results efficiently.
	// var selectedModel = mongoose.model(param);
	// var promise = selectedModel
	// 	.find({ url: { $in: urls } }).exec();
	// return promise;


	// 2. Second way, way of using promise
	var selectedModel = mongoose.model(param);
	let promiseReferenceIDs = [];
	//map over url, 
	// collecting all the promise
	// execu and await

	for(let url of urls){
		promiseReferenceIDs.push(
			selectedModel
				.findOne({ url:  url },{'id': 1}).exec()
		);
	}


	return Promise.all(promiseReferenceIDs);
};