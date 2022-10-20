const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dateTime = require('date-and-time');
const sql = require('mssql');

const serverConfig = require('./routes/connection');

const dbCityOperations = require('./database/Cities/dbCityOperations');
const dbMovieOperations = require('./database/Movies/dbMovieOperations');
const dbTheaterOperations = require('./database/Theaters/dbTheaterOperations');
/*const { server } = require('./database/dbconfig');*/
/*const { Date, Date } = require('mssql');*/





app.get('', (req, res) => {
    res.end(' requesting blank');
});

app.get('/home', (req, res) => {
    res.end('Welcome to Home');
});




//---------------------------City APIs---------------------------------------------------------------

app.get('/addCity', function (req, res) {
    console.log('requesting to Add city...');
    var receivedQuery = req.query;
    var CityName = req.query.CityName;
    var isSuccessfull = dbCityOperations.addCityByName(CityName);

    if (isSuccessfull == true)
        res.end('Operation Successfull! \nCity Added: ' + CityName);
    else
        res.end('City can not be added.... Please try again..');
});

app.get('/getAllCitiesList', (req, res) => {
    console.log('requesting to get All cities...');
    var CityList = dbCityOperations.getAllCities().then(result => {
        res.json(result);
    });
});

app.get('/getCitiesByQuery', (req, res) => {  //using query api (req.query)
    console.log('requesting to get cities by url query...');
    var receivedQuery = req.query; //url string must be created from frontend
    var cityQuery = receivedQuery.cityQuery;
    var cityList = dbCityOperations.getCitiesByQuery(cityQuery).then(result => {
        res.json(result);
    });

});


app.get('/getCitiesByParam/:textCityParam', (req, res) => {  //using parameter api (req.params)
    console.log('requesting to get cities by url parameters...');
    var receivedParams = req.params;
    var cityQuery = receivedParams.textCityParam;
    var cityList = dbCityOperations.getCitiesByQuery(cityQuery).then(result => {
        res.json(result);
    });

});

//----------------------------------------------------------------------------------------------------





//-----------------------Theater APIs-----------------------------------------------------------------

app.get('/addTheater', function (req, res) {
    console.log('requesting to add Theater...');
    var receivedQuery = req.query;
    var TheaterName = receivedQuery.theaterName;
    var CityId = receivedQuery.cityId;
    var successfull = dbTheaterOperations.AddTheater(TheaterName, CityId);

    if (successfull == true)
        res.end('Operation Successfull!   Theater Added: ' + TheaterName);
    else
        res.end('Theater can not be added.... Please try again..');

});

app.get('/getTheater', (req, res) => {
    console.log('requesting to get Theater...');
    var receivedQuery = req.query;
    var CityId = receivedQuery.cityId;
    var TheaterList = dbTheaterOperations.GetTheaterByCity(CityId).then(result => {
        res.json(result);
    });
});

//-----------------------------------------------------------------------------------------------------





//-------------------------Movie APIs------------------------------------------------------------------

app.get('/addMovie', (req, res) => {
    console.log('requesting to add movie...');
    var receivedQuery = req.query;
    var MovieName = receivedQuery.MovieName;
    var TheaterId = receivedQuery.TheaterId;
    var Date = receivedQuery.Date;  //date format recieved from client yyyy-mm-dd
    var successfull = dbMovieOperations.addMovie(MovieName, TheaterId, Date).then(result => {
        res.end('Operation Successfull!   Movie Added: ' + MovieName);
    });
});

app.get('/getMovie', function (req, res) {
    console.log('requesting to get movie...');
    var receivedQuery = req.query;
    var TheaterId = receivedQuery.theaterId;
    var Date = receivedQuery.Date;
    var MovieList = dbMovieOperations.getMoviesByTheaterAndDate(TheaterId, Date).then(result => {
        res.send(result);
    });
});

//-----------------------------------------------------------------------------------------------------



















app.listen(serverConfig.port, serverConfig.hostname, () => {
    console.log('listening on port: ${serverConfig.port} of ' + serverConfig.hostname);
    console.log("server is running....\n");
})
    