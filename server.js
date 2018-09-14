const express = require("express");
const app = express();
const user = require('./routes/user');
const comment = require('./routes/comment');
const social = require('./routes/social');



app.use('/api/v1/users', user);
app.use('/api/v1/comment', comment);
app.use('/api/v1/social', social);


app.listen(3000, () => {
    console.log("server on port 3000");
})