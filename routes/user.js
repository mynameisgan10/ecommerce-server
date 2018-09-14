const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication/authentication');

router.post('/auth', authentication.authenticate);

router.post('/signup', authentication.signup);

module.exports = router;