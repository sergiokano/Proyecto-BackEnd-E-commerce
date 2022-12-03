const { Order, Product } = require('../models/index.js');

const OrderController = {

  async create(req, res) {
    try {
      const order = await Order.create({ UserId: req.user.id, PaymentMethod: req.body.paymentMethod })
      order.addProduct(req.body.products);
      res.status(201).send({ message: 'Order published', order })

    } catch (error) {
      console.error(error)
      res.status(500).send({ msg: "Error while creating order", error })
    }

  },

  async getAllOrders(req, res) {
    try {
      const order = await Order.findAll({
        include: [{ model: Product, attributes: ["name", "price", "description"], through: { attributes: [] } }],
      });
      res.send({ msg: "Your order", order });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error while getting orders", error });
    }
  }

}

module.exports = OrderController