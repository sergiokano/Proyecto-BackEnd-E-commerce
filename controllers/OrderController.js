const { Order, Product } = require('../models/index.js');

// const { Op } = Sequelize;

const OrderController = {

    async create(req, res) {
        try {
            const order = await Order.create({ ...req.body, /*UserId: req.user.id*/ })
            order.addProduct(req.body.ProductId);
            res.status(201).send({ message: 'Order published', order })

        } catch (error) {
            console.error(error)
            res.status(500).send({ msg: "Error while creating product", error })
        }

    },

    async getAllOrders(req, res) {
        try {
          const order = await Order.findAll({
            include: [{ model: Product, attributes: ["name"], through: { attributes: [] } }],
          });
          res.send({ msg: "Your order", order });
        } catch (error) {
          console.error(error);
          res.status(500).send({ msg: "Error while getting orders", error });
        }
      }
  
}

module.exports = OrderController