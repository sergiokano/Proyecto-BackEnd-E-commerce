
const { Product, Category, Sequelize } = require('../models/index.js');

const { Op } = Sequelize;

const ProductController = {

    async create(req, res) {
        try {
            const product = await Product.create({ ...req.body })
            // product.addCategory(req.body.CategoryId);
            res.status(201).send({ message: 'Product published', product })

        } catch (error) {
            console.error(error)
            res.status(500).send({ msg: "Error while creating product", error })
        }

    },

    //El endpoint de traer productos debe mostrarse junto a la categoría o categorías que pertenece
    async getProductCategories(req, res) {
        try {
          const products = await Product.findAll({
            include: [{ model: Category, attributes: ["name"], through: { attributes: [] } }],
          });
          res.send({ msg: "Your products", products });
        } catch (error) {
          console.error(error);
          res.status(500).send({ msg: "Error while getting products", error });
        }
      },

    async delete(req, res) {
        try {
            const product = await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send({ message: 'Product deleted', product })
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Error deleting product", error });
        }
    },



    async update(req, res) {
        try {
            const product = await Product.update({ ...req.body },
                {
                    where: {
                        id: req.params.id
                    }
                })
            res.status(200).send({ message: 'Product updated', product })
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Error updating product", error });
        }

    },

    async getById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            res.status(200).send({ message: 'Product selected by id', product })
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Error getting product", error });
        }
    },

    async getOneByName(req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`
                    }
                },
            })
            res.status(200).send({ message: 'Product selected by name', product })
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Error getting product", error });
        }
    },

    async getOneByPrice(req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    price: {
                        [Op.like]: `%${req.params.price}%`
                    }
                },
            })
            res.status(200).send({ message: 'Product selected by price', product})
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Error getting product", error });
        }
    },

    async orderByPrice(req, res) {
        try {
            const product = await Product.findAll({

                order: [
                    ['price', 'DESC'],
                ]

            })
            res.status(200).send({ message: 'Products ordered by price', product })
        }

        catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Error getting ordered products by price", error });
        }

    }
}

module.exports = ProductController