const express = require('express');
const router = express.Router();
const comment = require('../controllers/comment/comment')

router.post('/new', comment.create);

router.post('/delete', comment.delete);

module.exports = router;