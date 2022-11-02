
const { Product } = require('../models/index.js');

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
        // await Product.destroy({
        //     where: {
        //         id: req.params.id
        //     }
        // })
        // res.send(
        //     'El producto ha sido eliminado con éxito'
        // )
    },

}

module.exports = ProductController