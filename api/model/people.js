module.exports = require('../models')('People',{

	name : { type: String, default: null },
	height : { type: String, default: null },
	mass : { type: String, default: null },
	hair_color : { type: String, default: null },
	skin_color : { type: String, default: null },
	eye_color : { type: String, default: null },
	birth_year : { type: String, default: null },
	gender : { type: String, default: null },
	homeworld : { type: String, default: null },
	//TODO, these two should be an array of ObjectID of films
	films : [{ type: String, default: null }],
	species : [{ type: String, default: null }],
	vehicles : [{ type: String, default: null }],
	starships : [{ type: 'ObjectId', ref: 'Starship', index: true }],
	created : { type: String, default: null },
	edited : { type: String, default: null },
	url : { type: String, default: null },
	
}, 'people');