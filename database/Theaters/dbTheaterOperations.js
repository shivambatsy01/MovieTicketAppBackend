var config = require('../dbconfig');
var sql = require('mssql');



async function AddTheater(TheaterName, CityId) {
    try {
        console.log('trying AddTheater operations: connecting to db....');
        console.log(TheaterName, CityId);
        let pool = await sql.connect(config);
        let successfull = await pool.request().query("EXEC spAddTheater " + "'"+TheaterName+"'" + ", " + CityId).then(result => {
            console.log(result.rowsAffected > 0 ? 'Theater Added...' : 'Theater Can not be added...\n');
            return result.rowsAffected > 0;
        });
        return successfull;
    }
    catch (error) {
        console.log('error in adding theater....\n');
        console.log(error);
    }

    console.log('\n');
}


async function GetTheaterByCity(CityId) {
    try {
        console.log('GetTheaterByCity: trying to connect to db...');
        console.log(CityId);
        let pool = await sql.connect(config);
        let TheaterList = await pool.request().query("EXEC spGetTheatersByCityId " + CityId);
        console.log("GetTheaterByCity Operation: successfull!");
        return TheaterList.recordset;

    }
    catch (error) {
        console.log('ERROR: bad config...  Unable to call GetTheaterByCity()');
        console.log(error);
    }

    console.log('\n');
}


module.exports = {
    AddTheater: AddTheater,
    GetTheaterByCity: GetTheaterByCity
}