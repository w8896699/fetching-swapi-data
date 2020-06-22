var express     = require('express');
var router      = express.Router();
var mongoose    = require('mongoose');
var defaultLog    = require('../logger');

const getAllStarWarsData = require('../utils/getAllDataOfCollectionFromAPI'); 
const getStarships = require('../utils/getRelatedStarshipsfromAPI');

//TODO, remove those function into a separate controller
router.get('/fetchInfo',async (req, res) =>{
	try{
		var AllPeopleData = [];
		var AllStarshipsData = [];
		var People = mongoose.model('People');
		var StarShip = mongoose.model('Starship');
		const PeopleData = await (async () => {
			return await getAllStarWarsData('people');
		})();
    
		const starShipsData = await (async () => {
			return await getAllStarWarsData('starships');
		})();
    
		starShipsData.forEach( starShipInfo => {
			var newStarship = new StarShip();
        
			newStarship.name = starShipInfo.name;
			newStarship.url = starShipInfo.url;
			newStarship.edited = starShipInfo.edited;
			newStarship.created = starShipInfo.created;
			newStarship.films = starShipInfo.films;
			newStarship.pilots = starShipInfo.pilots;
			newStarship.starship_class = starShipInfo.starship_class;
			newStarship.hyperdrive_rating = starShipInfo.hyperdrive_rating;
			newStarship.consumables = starShipInfo.consumables;
			newStarship.cargo_capacity = starShipInfo.cargo_capacity;
			newStarship.passengers = starShipInfo.passengers;
			newStarship.crew = starShipInfo.crew;
			newStarship.max_atmosphering_speed = starShipInfo.max_atmosphering_speed;
			newStarship.length = starShipInfo.length;
			newStarship.cost_in_credits = starShipInfo.cost_in_credits;
			newStarship.manufacturer = starShipInfo.manufacturer;
			newStarship.model = starShipInfo.model;
			newStarship.MGLT = starShipInfo.MGLT;
        
			AllStarshipsData.push(newStarship);
		});

		await StarShip.collection.insert(AllStarshipsData, function (err) {
			if (err){ 
				return defaultLog.errorLog.info(err);
			}
			defaultLog.accessLog.info('Successful inserted starShip into Collection');
		});



		for( let peopleInfo of PeopleData) {
			var newPeople = new People();
		
			newPeople.name = peopleInfo.name;
			newPeople.mass = peopleInfo.mass;
			newPeople.height = peopleInfo.height;
			newPeople.hair_color = peopleInfo.skin_color;
			newPeople.eye_color = peopleInfo.eye_color;
			newPeople.birth_year = peopleInfo.birth_year;
			newPeople.gender = peopleInfo.gender;
			newPeople.homeworld = peopleInfo.homeworld;
			newPeople.films = peopleInfo.films;
			newPeople.species = peopleInfo.species;
			newPeople.vehicles =peopleInfo.vehicles;
			// newPeople.starships =mongoose.Types.ObjectId('5ef03cf00b3f5f25ee00d92c');
			newPeople.created = peopleInfo.created;
			newPeople.edited = peopleInfo.edited;
			newPeople.url = peopleInfo.url;
        
			//find corresponding star ship for each people
			var starshipID;
			if(peopleInfo.starships.length !== 0){ // an array of urls of starship
				starshipID = await getStarships(peopleInfo.starships);
				newPeople.starships = starshipID;
			}else{
				newPeople.starships = peopleInfo.starships; //is an empty array
			}

			AllPeopleData.push(newPeople);
         
		}

		await People.collection.insert(AllPeopleData, function (err) {
			if (err){ 
				return defaultLog.errorLog.info(err);
			} else {
				defaultLog.accessLog.info('Multiple documents inserted to People collection');
			}
		});

		res.send('Finished fetching process');
	} catch(e){
		defaultLog.errorLog.info('Error:', e);
		return res.send(res, 400, e);
	}
});


module.exports = router;