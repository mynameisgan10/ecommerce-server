const express = require('express');
const router = express.Router;
const comment = require('../controllers/comment/comment');



router.get('/comment/:productid', comment.getProductComments);
router.post('/comment/reply/:id',comment.replyComment);




module.exports = router;