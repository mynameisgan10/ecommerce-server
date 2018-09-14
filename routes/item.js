const express = require('express');
const router = express.Router();
const item = require('../controllers/item/item');

router.post('/new', item.newItem);

router.post('/delete', item.deleteItem);

router.get('/categories', item.getItemCategories);

module.exports = router