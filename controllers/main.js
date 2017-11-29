var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var controller = {};

controller.showHomePage = function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    if (err)
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
};

controller.addItemToCart = function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err)
      console.error(err);
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/');
  });
};

controller.showShoppingCart = function(req, res, next) {
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
};

controller.checkout = function(req, res, next) {
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
    cart: cart
    // address: req.body.address,
    // name: req.body.name,
    // paymentId: paymentId
  });
  order.save(function(err, result) {
    if (err)
      console.error(err);
    req.flash('success', 'Successfully bought product!');
    req.session.cart = null;
    res.redirect('/');
  });
};

controller.reduceItemByOne = function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};

controller.removeAllItems = function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};

controller.userIsLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.session.olUrl = req.url;
  res.redirect('/user/signin');
};

module.exports = controller;
