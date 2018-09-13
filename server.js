const express = require("express");
const app = express();
const user = require('./routes/user');
const mysql = require('mysql');

app.use(((req, res, next) => {
    res.locals.connection = mysql.createConnection(
        {host: 'localhost', user: 'root', password: 'liverpool123', database: 'SHOPLET'}
    );
    res.locals.connection.connect();
    next();
}))
app.use('/api/v1/users', user);

app.listen(3000, () => {
    console.log("server on port 3000");
})