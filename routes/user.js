const express = require('express');
const router = express.Router();


router.post('/auth', (req,res) => {
    res.json({
        status: "success"
    })
});

router.post('/signup', (req,res) => {
    res.json({
        status: "success",
        message: "signed up"
    })
});


module.exports = router;