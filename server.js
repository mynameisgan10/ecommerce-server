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
const cors = require('cors');


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(cookiesToAuth); // check incoming requests for csrf token in the header and compare it with jwt cookie
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,// some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}
app.use(cors(corsOptions));
app.options('*',cors(corsOptions));

//TOO write a middleware to check for csurf on PUT DELETE POST routes;

// app.use('/',express.static('dist'))
app.use('/api/v1/users', user);
app.use('/api/v1/question', question);
app.use('/api/v1/social', social);
app.use('/api/v1/item', item);

app.listen(3000, () => {
    console.log("server on port 3000");
})