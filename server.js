require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user');
const question = require('./routes/question');
const social = require('./routes/social');
const item = require('./routes/item');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => { // check incoming requests for csrf token in the header and compare it with jwt cookie
    console.log("logged");
    console.log(process.env.JWT_SECRET);
    req.headers.authorization = "1";
    console.log(req.headers.authorization);
    console.log(req.cookies);
    next();
})



app.use('/api/v1/users', user);
app.use('/api/v1/question', question);
app.use('/api/v1/social', social);
app.use('/api/v1/item', item);

app.listen(3000, () => {
    console.log("server on port 3000");
})