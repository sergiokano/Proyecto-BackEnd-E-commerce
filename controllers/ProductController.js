
const { Product } = require('../models/index.js');

const { Op } = Sequelize;

const ProductController = {

    create(req, res) {

        Product.create({ ...req.body })

            .then(Product => res.status(201).send({ message: 'Publicación creada con éxito', Product }))

            .catch(console.error)

    },

    //El endpoint de traer productos debe mostrarse junto a la categoría o categorías que pertenece
    getAll(req, res) {

        Product.findAll({

            // include: [Category]

        })

            .then(Products => res.send(Products))

            .catch(err => {

                console.log(err)

                res.status(500).send({ message: 'Error loading categories' })

            })

    },

    async delete(req, res) {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send(
            'El producto ha sido eliminado con éxito'
        )
    },

    async update(req, res) {
        await Product.update({ ...req.body },
            {
                where: {
                    id: req.params.id
                }
            })
        res.send('Producto actualizado con éxito');
    },

    getById(req, res) {
        Product.findByPk(req.params.id)
            .then(post => res.send(post))
    },

    getOneByName(req, res) {
        Product.findOne({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            },
        })
            .then(product => res.send(product))
    },


}

module.exports = ProductController