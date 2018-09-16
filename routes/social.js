const express = require('express');
const router = express.Router();
const social = require('../controllers/social/social');

router.post('/follow/:userid', social.follow);

router.post('/unfollow/:userid',social.unfollow);

router.post('/like/:itemid',social.like);

router.post('/unlike/:itemid',social.unlike);

module.exports = router;