
const { Product } = require('../models/index.js');

const ProductController = {

    create(req, res) {

        Product.create({ ...req.body })

            .then(Product => res.status(201).send({ message: 'Publicación creada con éxito', Product }))

            .catch(console.error)

    },

    createProduct(req, res) {

        let sql = `INSERT INTO Products (name, price, description) values
        
        ('TV', '4000', 'SmarTV')`;

        db.query(sql, (err, result) => {

            if (err) throw err;

            console.log(result);

            res.send("Product added...");

        });

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

}

module.exports = ProductController