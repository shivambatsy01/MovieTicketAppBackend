//connection string object
var sql = require('mssql');

const config = {

    //config is connection string, can be used : await sql.connect(config) anywhere in project to open connection
    server: 'DESKTOP-IPRMJMF',
    port: 56226,
    database: 'movieticket',

    //user must have all access to database
    //user must have right to login into server and it must also be in the user list of particular database
    //database -> security -> user (modify properties)
    //server -> security -> user (modify properties)

    user: 'userofapi', //server->security->logins (list of users)
    password: '12345',

    options: {
        trustedconnection: true,
        enableArithAbort: true,
        trustServerCertificate: true,
        instancename: 'SQLEXPRESS'
    },
}

module.exports = config;  //this module can be used with name config in other classes (composition OOP)