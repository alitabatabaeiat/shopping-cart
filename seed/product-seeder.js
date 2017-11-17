var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/shopping', {
  useMongoClient: true
});

var products = [
  new Product({
    imagePath: '/assets/fifa18.jpg',
    title: 'FIFA 18',
    description: 'Football Game',
    price: 60
  }),
  new Product({
    imagePath: '/assets/codwwii.jpg',
    title: 'Call of Duty WWII',
    description: 'Arcade Game',
    price: 60
  }),
  new Product({
    imagePath: '/assets/dota2.jpg',
    title: 'DOTA 2',
    description: 'Some Game',
    price: 30
  }),
  new Product({
    imagePath: '/assets/civilizationvi.jpg',
    title: 'Civilization VI',
    description: 'Strategy Game',
    price: 40
  }),
  new Product({
    imagePath: '/assets/pes18.png',
    title: 'Pro Evolution Soccer 2018',
    description: 'Football Game',
    price: 60
  }),
  new Product({
    imagePath: '/assets/gowiii.jpg',
    title: 'God Of War III',
    description: 'Some Game',
    price: 20
  }),
  new Product({
    imagePath: '/assets/uncharted4.jpg',
    title: 'Uncharted 4',
    description: 'Some Game',
    price: 50
  })
];
var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length)
      exit();
  });
}

function exit() {
  mongoose.disconnect();
}
