var config = require('../dbconfig');  //configurations to connect to database
var sql = require('mssql');



async function addCityByName(cityName) {
    try {
        console.log('addCityByName operation : trying to connect to db...');
        console.log(cityName);
        let pool = await sql.connect(config);
        let successfull = await pool.request().query('EXEC spAddCity ' + "'"+cityName+"'").then(result => {
            console.log(result.rowsAffected > 0 ? 'City Added...' : 'City Can not be added...\n');
            return result.rowsAffected > 0;
        });
        return successfull;
    }
    catch (error) {
        console.log('error in addCityByName....');
        console.log(error);
    }

    console.log('\n');
}


async function getAllCities() {
    try {
        console.log('getAllCitiesOperation: trying to connect...');
        let pool = await sql.connect(config);
        let cityList = await pool.request().query("EXEC spGetAllCities"); //stored procedure
        console.log("getAllCitiesOperation: successfull!");
        return cityList.recordset;
    }
    catch (error) {
        console.log('ERROR: bad config...  Unable to call getCities()\n');
        console.log(error);
    }

    console.log('\n');
}


async function getCitiesByQuery(cityQuery) {
    try {
        console.log('getCitiesByQuery: trying to connect to db...');
        console.log(cityQuery);
        let pool = await sql.connect(config);
        let cityList = await pool.request().query("EXEC spGetCitiesByQuery " + cityQuery); //stored procedure
        console.log("getCitiesByQueryOperation: successfull!");
        return cityList.recordset;
    }
    catch (error) {
        console.log('ERROR: bad config...  Unable to call getCitiesByQuery()');
        console.log(error);
    }

    console.log('\n');
}



module.exports = {
    getAllCities: getAllCities,  //export function
    getCitiesByQuery: getCitiesByQuery,
    addCityByName: addCityByName
}