var passport = require('passport');

var Cart = require('../models/cart');
var Order = require('../models/order');

var controller = {};

controller.showProfilePage = function(req, res, next) {
  Order.find({
    user: req.user
  }, function(err, orders) {
    if (err)
      return console.error(err);
    var cart;
    orders.forEach(function(order) {
      cart = new Cart(order.cart);
      console.log(cart);
      order.items = cart.generateArray();
    });
    res.render('user/profile', {
      orders: orders
    });
  });
};

controller.logout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};

controller.showSignUpPage = function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasError: messages.length > 0
  });
};

controller.signUp = function(req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
};

controller.passportLocalSignUp = passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
});

controller.showSignInPage = function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasError: messages.length > 0
  });
};

controller.passportLocalSignIn = passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
});

controller.signIn = function(req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
};

controller.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/user/signin');
};

controller.notLoggedIn = function(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/user/profile');
}

module.exports = controller;
