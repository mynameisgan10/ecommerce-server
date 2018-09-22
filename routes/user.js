const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication/authentication');
const cookiesToAuth = require('../middlewares/cookiesToAuth/cookiesToAuth');

router.post('/auth', authentication.authenticate);

router.post('/signup', authentication.signup);

router.get('/profile', authentication.getProfile);

router.post('/me', cookiesToAuth, authentication.reauthenticate);
module.exports = router;