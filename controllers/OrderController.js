const { Order, Product, User } = require('../models/index.js');

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
  },

  async getOrdersUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id, { include: [{ model: Order, include: [{ model: Product }] }] })

      res.send(user)
    } catch (error) {
      res.status(500).send({ message: 'There was a problem' })
      console.error(error)
    }
  },
}

module.exports = OrderController