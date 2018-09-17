const express = require('express');
const router = express.Router();
const social = require('../controllers/social/social');

router.post('/follow/:userid', social.follow);

router.delete('/unfollow/:userid',social.unfollow);

router.post('/like/:itemid',social.like);

router.delete('/unlike/:itemid',social.unlike);

module.exports = router;