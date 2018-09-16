const express = require('express');
const router = express.Router();
const item = require('../controllers/item/item');

router.post('/new', item.newItem);

router.delete('/delete/:productid', item.deleteItem);

router.get('/categories/:category', item.getItemCategories);

router.post('/save', item.saveItem);

module.exports = router