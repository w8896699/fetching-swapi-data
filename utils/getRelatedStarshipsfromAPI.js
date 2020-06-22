var mongoose    = require('mongoose');
var defaultLog    = require('../logger');

module.exports =  async function(urls){
	var Starship = mongoose.model('Starship');
	let promises = [];

	for(let url of urls){

		await Starship
			.findOne({ url: url })
			.exec(( err, item) => {

				if (err) return defaultLog.errorLog.info('error',err);

				promises.push(mongoose.Types.ObjectId(item._id));
			});
	}
	//TODO add error handing, like disconnect from db, try to reconnect
	return (promises);
};