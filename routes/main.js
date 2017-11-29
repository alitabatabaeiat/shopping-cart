var express = require('express');
var router = express.Router();

var mainContorller = require('../controllers/main');

/* GET home page. */
router.get('/', mainContorller.showHomePage);

router.get('/add-to-cart/:id', mainContorller.addItemToCart);

router.get('/shopping-cart', mainContorller.showShoppingCart);

router.get('/checkout', mainContorller.userIsLoggedIn, mainContorller.checkout);

router.get('/reduce/:id', mainContorller.reduceItemByOne);

router.get('/remove/:id', mainContorller.removeAllItems);

module.exports = router;
