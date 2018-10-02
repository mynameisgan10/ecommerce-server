const express = require('express');
const router = express.Router();
const item = require('../controllers/item/item');
const passport = require('passport');
const cookiesToAuth = require('../middlewares/cookiesToAuth/cookiesToAuth');
const multer  = require('multer')
const upload = multer()


router.post('/new',passport.authenticate('jwt',{session: false}),upload.array('images', 4), item.newItem);

router.delete('/delete/:productid', passport.authenticate('jwt',{session: false}),item.deleteItem);

router.get('/categories',item.getItemCategories);

router.get('/categories/:category', item.getItemByCategories);

router.get('/:id',item.getItemById);

router.get('/user/:id',passport.authenticate('jwt',{session: false}),item.getItemsByUserId)

router.post('/save/:itemid', item.saveItem);

router.post('/like/:itemid', item.likeItem)


module.exports = router