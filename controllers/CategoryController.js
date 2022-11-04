const { Category } = require("../models/index.js");

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

  //El endpoint de traer Categoryos debe mostrarse junto a la categoría o categorías que pertenece
  getAll(req, res) {
    Category.findAll({
      // include: [Category]
    })

      .then((Categories) => res.send(Categories))

      .catch((err) => {
        console.log(err);

        res.status(500).send({ message: "Error loading categories" });
      });
  },

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
        id: req.params.id,
      },
    });
    res.send("La categoría ha sido eliminada con éxito");
  },
};

module.exports = CategoryController;
