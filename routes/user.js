var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var userController = require('../controllers/user');

var csrfProtection = csrf();
router.use(csrfProtection);

router.use(['/profile', '/logout'], userController.isLoggedIn);

router.get('/profile', userController.showProfilePage);

router.get('/logout', userController.logout);

router.use('/', userController.notLoggedIn);

router.get('/signup', userController.showSignUpPage);

router.post('/signup', userController.passportLocalSignUp, userController.signUp);

router.get('/signin', userController.showSignInPage);

router.post('/signin', userController.passportLocalSignIn, userController.signIn);

module.exports = router;
