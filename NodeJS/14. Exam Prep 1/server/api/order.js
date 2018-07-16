const mongoose = require('mongoose');
const Order = mongoose.model('Order');

async function create(data) {
    const creator = data.creator;
    const product = data.product_id;
    const toppings = [];
    for (var key in data) {
        if (!data.hasOwnProperty(key)) {
            continue;
        }
        if (key !== 'creator' && key !== 'product_id') {
            toppings.push(key);
        }
    }
    return await Order.create({
        creator,
        product,
        toppings
    });
}

async function getByUserId(userId) {
    return await Order.find({creator: userId}).populate('product');
}

async function getById(id) {
    return await Order.find({_id: id});
}

module.exports = {
    create,
    getByUserId,
    getById
};