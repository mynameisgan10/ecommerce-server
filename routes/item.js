const express = require('express');
const router = express.Router();
const item = require('../controllers/item/item');
const cookiesToAuth = require('../middlewares/cookiesToAuth/cookiesToAuth');

router.post('/new', item.newItem);

router.delete('/delete/:productid', item.deleteItem);

router.get('/categories',item.getItemCategories);

router.get('/categories/:category', item.getItemByCategories);

router.get('/:id',item.getItemById);

router.post('/save', item.saveItem);


module.exports = router