const express = require('express');
const router = express.Router();
const social = require('../controllers/social/social');

router.post('/follow', social.follow);

router.post('/unfollow',social.unfollow);

router.post('/like',social.like);

router.post('/unlike',social.unlike);

module.exports = router;