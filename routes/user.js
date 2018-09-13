const express = require('express');
const router = express.Router();


router.post('/auth', (req,res) => {
    res.json({
        status: "success"
    })
});

router.post('/signup', (req,res) => {
    const user = {
        username: "testname",
        password: "123123123"
    }
    res.locals.connection.query('INSERT INTO Users SET ? ', user, (error, results) => {
        if (error) throw error
        res.json({
            status: "success",
            message: "signed up"
        })
    })
    
});

router.post('/comment', (req,res) =>{
    res.json({
        status: "success",
        message: "comment posted"
    })
})


module.exports = router;