const express = require('express');
const router = express.Router();
const question = require('../controllers/question/question')

router.post('/new', question.create);

router.post('/answer', question.answer);

router.post('/delete', question.delete);

module.exports = router;