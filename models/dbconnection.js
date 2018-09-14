const mysql = require('mysql');

const connection = mysql.createConnection(
    {host: 'localhost', user: 'root', password: 'liverpool123', database: 'SHOPLET'}
);

module.exports = connection;