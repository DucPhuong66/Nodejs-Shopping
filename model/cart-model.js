const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number, default: 0},
        price: { type: Number, default: 0},
        name: { type: String},
        image: { type: String}
    }],
    totalQty: { type: Number, default: 0, require: true},
    totalCost: { type: Number, default: 0, require: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Cart', cartSchema);