//api call

const CityOperations = require('./database/Cities/dbCityOperations');

CityOperations.getAllCities().then(result => {
    console.log(result);
    console.log('this was result of all cities');
})

CityOperations.getCitiesByQuery('r').then(result => {
    console.log(result);
})