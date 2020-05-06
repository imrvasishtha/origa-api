const mongoose = require(`../mongoose`);

try {
    const schema = new mongoose.Schema({
        userId: {
            type: Number,
            required: true
        },
        orderId: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: new Date()
        }
    });
    var orders = mongoose.model('orders', schema);
} catch (err) {
    return err;
}

module.exports = orders;