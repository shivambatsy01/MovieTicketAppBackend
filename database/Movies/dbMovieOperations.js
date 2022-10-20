var config = require('../dbconfig');
var sql = require('mssql');


async function addMovie(MovieName, TheaterId, Date) {
    try {
        console.log('trying to add Movie....');
        console.log(MovieName, TheaterId, Date);
        let pool = await sql.connect(config); //connection pool opened
        let successfull = await pool.request().query("EXEC spAddMovie " + "'" + MovieName + "'" + "," + "'" + Date + "'" + "," + TheaterId).then(result => {
            return result
        });

        return successfull;
    }
    catch (error) {
        console.log('error in addMovie...');
        console.log(error);
    }

    console.log('\n');
}


async function getMoviesByTheaterAndDate(TheaterId, Date) {
    try {
        console.log('getMoviesByTheaterAndDate: trying to connect to db...');
        console.log(TheaterId, Date);
        let pool = await sql.connect(config);  //connection pool opened
        let MovieList = await pool.request().query("EXEC spGetMoviesList " + TheaterId + "," + "'" + Date + "'");
        return MovieList.recordset;
    }
    catch (error) {
        console.log('ERROR: bad config...  Unable to call getMoviesByTheaterAndDate()');
        console.log(error);
    }

    console.log('\n');
}



module.exports = {
    getMoviesByTheaterAndDate: getMoviesByTheaterAndDate,
    addMovie: addMovie
}