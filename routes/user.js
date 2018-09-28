const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication/authentication');
const cookiesToAuth = require('../middlewares/cookiesToAuth/cookiesToAuth');
const passport = require('passport');


router.post('/auth', authentication.authenticate);

router.post('/signup', authentication.signup);

router.get('/profile', authentication.getProfile);

router.post('/me', cookiesToAuth,passport.authenticate('jwt',{session: false}),authentication.reauthenticate);

router.post('/logout',authentication.logout);
module.exports = router;