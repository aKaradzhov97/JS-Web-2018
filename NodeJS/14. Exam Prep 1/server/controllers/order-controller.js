const productApi = require('../api/product');
const orderApi = require('../api/order');


module.exports = {
    placeGet: async (req, res) => {
        const id = req.params.id;
        const product = await productApi.getById(id);
        res.render('order/place', product);
    },
    placePost: async (req, res) => {
        const data = req.body;
        data.creator = req.user._id;
        try {
            await orderApi.create(data);
            return res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.render('order/place', {error: err.message});
        }
    },
    status: async (req, res) => {
        //.populate to get product name & size
        const orders = await orderApi.getByUserId(req.user._id);
        orders.map(o => {
            o.productName = productApi.getName(o.product.category, o.product.size)
        });
        res.render('order/status', {orders});
    },
    details: async (req, res) => {
        const order = await orderApi.getById(req.params.id);
        order.productName = productApi.getName(order.product.category, order.product.size);
        res.render('order/details', {order});
    }
};