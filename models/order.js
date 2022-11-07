'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    
    static associate(models) {
      Order.belongsToMany(models.Product,{

        through:models.ProductOrder
        
        })
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    PaymentMethod: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};