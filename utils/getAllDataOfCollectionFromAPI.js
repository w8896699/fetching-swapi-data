
const axios = require('axios');
var defaultLog    = require('../logger');

module.exports = function(category){
	let result = [];
	// first page
	return axios(`https://swapi.dev/api/${category}`)
		.then(response => {
			// collect people from first page
			return response.data.count;
		})
		.then(count => {
			// exclude the first request
			const numberOfPages = Math.ceil((count / 10));
			let promises = [];
			// start at 2 as you already queried the first page
			for (let i = 1; i <= numberOfPages; i++) {
				promises.push(axios(`https://swapi.dev/api/${category}?page=${i}`));
			}
			return Promise.all(promises);
		})
		.then(response => {
			//get the rest records - pages 2 through n.
			result = response.reduce((acc, data) => [...acc, ...data.data.results], result);
			return result;
		})
		.catch(error => defaultLog.errorLog.info('what is the error', error));
};
