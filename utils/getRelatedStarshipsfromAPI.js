var mongoose    = require('mongoose');
var defaultLog    = require('../logger');

module.exports =  async function(urls,param){
	// first way, return the whole promise, use $in to $in operator to pass in an array to find and get a large set of results efficiently.
	var selectedModel = mongoose.model(param);
	var promise = selectedModel
		.find({ url: { $in: urls } }).exec();
	return promise;
	// let promiseReferenceIDs = [];
	// let referenceIDs = [];

	//map over url, 
	// collecting all the promise
	// execu and await

	// for(let url of urls){


	// .exec(( err, item) => {
	// 	if (err) return defaultLog.errorLog.info('error',err);
	// 	promiseReferenceIDs.push(item);
	// });
	// }


	// .then((itemArray, err)=>{
	// 	if (err) {
	// 		defaultLog.errorLog.info('error',err);
	// 		return err;
	// 	}
	// 	console.log('i am here', itemArray);
	// 	return itemArray;
	// });
	
	//TODO add error handing, like disconnect from db, try to reconnect
	// promiseReferenceIDs.forEach((item) =>{
	// 	referenceIDs.push( item._id);
	// });
};