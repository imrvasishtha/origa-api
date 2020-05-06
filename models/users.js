const mongoose = require(`../mongoose`);

try {
    const schema = new mongoose.Schema({
        userId: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        NoofOrders: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now()
        }
    });
    var users = mongoose.model('users', schema);
} catch (err) {
    return err;
}

module.exports = users;