const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        totalQuantity: {
            type: Number,
            default: 0,
            require: true,
        },
        totalCost: {
            type: Number,
            default: 0,
            require: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    default: 0,
                },
                price: {
                    type: Number,
                    default: 0,
                },
                name: {
                    type: String,
                }
            },
        ],
        address: {
            type: String,
            require: true,
        }
    }
})

module.exports = mongoose.model('Order', orderSchema);