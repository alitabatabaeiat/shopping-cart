var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    if(err)
      console.error(err);
    var productChunks = [];
    var chunksSize = 3;
    for (var i = 0; i < docs.length; i += chunksSize)
      productChunks.push(docs.slice(i, i + chunksSize));
    res.render('shop/index', {
      title: 'Express',
      products: productChunks,
      successMsg: successMsg,
      noMessages: !successMsg
    });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err)
      console.error(err);
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/');
  });
});

router.get('/shopping-cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  var paymentId = '';
  // crypto.randomBytes(256, (err, buf) => {
  //   if (err) throw err;
  //   paymentId = buf.toString('hex')
  // });
  var order = new Order({
    user: req.user,
    cart: cart,
    address: req.body.address,
    name: req.body.name
    // paymentId: paymentId
  });
  order.save(function(err, result) {
    if (err)
      console.error(err);
    req.flash('success', 'Successfully bought product!');
    req.session.cart = null;
    res.redirect('/');
  });
});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  req.session.olUrl = req.url;
  res.redirect('/user/signin');
}
