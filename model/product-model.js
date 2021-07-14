const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    decription: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
});

productSchema.index({name: 'text'});

module.exports = mongoose.model('Product', productSchema, 'product');