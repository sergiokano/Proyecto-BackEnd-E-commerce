"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: models.ProductOrder,
      }),
        Product.belongsTo(models.Category);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: "no empty" } },
      },
      price: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: "no empty" } },
      },
      description: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: "no empty" } },
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
