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
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory,
      })
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
      img1: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: "no empty" } },
      },
      img2: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: "no empty" } },
      },
      img3: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: "no empty" } },
      }
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
