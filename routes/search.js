const express = require('express');
const router = express.Router();
const search = require('../controllers/search/search');


router.get('/', search.normalSearch);
router.get('/category/:name',search.byCategories);
router.get('/price',search.byPriceRange);

module.exports = router;