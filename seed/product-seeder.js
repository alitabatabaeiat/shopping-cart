var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/shopping', {useMongoClient: true});

var products = [
    new Product({
        imagePath: 'https://ksassets.timeincuk.net/wp/uploads/sites/54/2017/01/fifa-18-3.jpg',
        title: 'FIFA 18',
        description: 'Football Game',
        price: 60
    }),
    new Product({
        imagePath: 'https://www.callofduty.com/content/dam/atvi/callofduty/wwii/home/Stronghold_Metadata_Image.jpg',
        title: 'Call of Duty WWII',
        description: 'Arcade Game',
        price: 60
    }),
    new Product({
        imagePath: 'https://vignette.wikia.nocookie.net/defenseoftheancients/images/5/58/Bloodseeker_poster.jpg/revision/latest?cb=20120530205854',
        title: 'DOTA 2',
        description: 'Some Game',
        price: 0
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Civilization_VI_cover_art.jpg',
        title: 'Civilization VI',
        description: 'Strategy Game',
        price: 40
    }),
    new Product({
        imagePath: 'http://gameon.com.my/webshaper/pcm/gallery/lg/bc56eeb999bd1156a7f782378e724bee1501831559-lg.png',
        title: 'Pro Evolution Soccer 2018',
        description: 'Football Game',
        price: 60
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/8/8b/God_of_War_III_cover_art.jpg',
        title: 'God Of War III',
        description: 'Some Game',
        price: 20
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Uncharted_4_box_artwork.jpg',
        title: 'Uncharted 4',
        description: 'Some Game',
        price: 50
    })
];
var done = 0;
for(var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length)
            exit();
    });
}

function exit() {
    mongoose.disconnect();
}