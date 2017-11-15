var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunksSize = 3;
        for(var i = 0; i < docs.length; i += chunksSize)
            productChunks.push(docs.slice(i, i + chunksSize));
        res.render('shop/index', { title: 'Express', products: productChunks });
    });
});

router.get('/user/signup', function (req, res, next) {
    res.render('user/signup', { csrfToken: req.csrfToken() });
});

router.post('/user/signup', function (req, res, next) {

});

module.exports = router;
