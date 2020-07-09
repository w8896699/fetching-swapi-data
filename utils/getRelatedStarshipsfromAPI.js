var mongoose    = require('mongoose');
var defaultLog    = require('../logger');

module.exports =  async function(urls,param){
	var selectedModel = mongoose.model(param);
	let promiseReferenceIDs = [];
	let referenceIDs = [];

	//map over url, 
	// collecting all the promise
	// execu and await

	for(let url of urls){

		selectedModel
			.findOne({ url: url });
		// .exec(( err, item) => {
		// 	if (err) return defaultLog.errorLog.info('error',err);
		// 	promiseReferenceIDs.push(item);
		// });
	}

	promiseReferenceIDs = await Promise.all(promiseReferenceIDs);
	console.log('hiahia',promiseReferenceIDs);
	//TODO add error handing, like disconnect from db, try to reconnect
	promiseReferenceIDs.forEach((item) =>{
		referenceIDs.push( item._id);
	});
	return referenceIDs;
};