const { Category, Product } = require("../models/index.js");

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

  async getProductCategories(req, res) {
    try {
      const categories = await Category.findAll({
        include: [{ model: Product, attributes: ["name"], through: { attributes: [] } }],
      });
      res.send({ msg: "Your products", categories });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error while getting products", error });
    }
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
};

module.exports = CategoryController;