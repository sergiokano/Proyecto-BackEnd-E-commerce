const { Category, Sequelize } = require("../models/index.js");

const { Op } = Sequelize;

const CategoryController = {
  create(req, res) {
    Category.create({ ...req.body })

      .then((Category) =>
        res
          .status(201)
          .send({ message: "Categoría creada con éxito", Category })
      )

      .catch(console.error);
  },

  //El endpoint de traer Categories debe mostrarse junto a la categoría o categorías que pertenece
//   getAll(req, res) {
//     Category.findAll({
//       // include: [Category]
//     })

//       .then((Categories) => res.send(Categories))

//       .catch((err) => {
//         console.log(err);

//         res.status(500).send({ message: "Error loading categories" });
//       });
//   },

  async delete(req, res) {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("La categoría ha sido eliminada con éxito");
  },

  async update(req, res) {
    await Category.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("La categoría ha sido actualizada con éxito");
  },

  async delete(req, res) {
    await Category.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.send("La categoría ha sido eliminada con éxito");
  },

  getById(req, res) {
    Category.findByPk(req.params.id).then((category) => res.send(category));
  },

  getOneByName(req, res) {
    Category.findOne({
        where: {
            name: {
                [Op.like]: `%${req.params.name}%`
            }
        },
    })
        .then(Category => res.send(Category))
},
getBy(req, res) {
    Product.findByPk(req.params.id)
        .then(post => res.send(post))
}
};

module.exports = CategoryController;