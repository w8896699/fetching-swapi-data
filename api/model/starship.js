module.exports = require('../models')('Starship',{


	name : { type: String, default: null },
	model : { type: String, default: null },
	manufacturer : { type: String, default: null },
	cost_in_credits : { type: String, default: null },
	length : { type: String, default: null },
	max_atmosphering_speed : { type: String, default: null },
	crew : { type: String, default: null },
	passengers : { type: String, default: null },
	cargo_capacity : { type: String, default: null },
	consumables : { type: String, default: null },
	hyperdrive_rating : { type: String, default: null },
	starship_class : { type: String, default: null },
	//TODO, these two should be an array of ObjectID of pilots
	pilots : [{ type: String, default: null }],
	films : [{ type: String, default: null }],
	created : { type: String, default: null },
	edited : { type: String, default: null },
	url : { type: String, default: null },
	
}, 'starship');