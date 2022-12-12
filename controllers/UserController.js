const { User, Token, Order, Product, Sequelize } = require("../models/index.js");
const transporter = require("../config/nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;

const UserController = {
  async create(req, res, next) {
    try {
      req.body.role = "user";
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password,
        confirmed: false,
        role: "user",
      });
      // const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' })
      // const url = 'http://localhost:8080/users/confirm/' + emailToken
      // await transporter.sendMail({
      //   to: req.body.email,
      //   subject: "Please, confirm your registration",
      //   html: `<h3>You're getting closer to be registered</h3>
      //           <a href="${url}"> Click here to confirm your registration</a>`,
      // });
      // res.status(201).send({
      //   message: "Please, check your email to confirm your registration", user
      // });
    } catch (error) {
      console.error(error)
      error.origin = "User";
      next(error)
    };
  },

  // async confirm(req, res) {
  //   try {
  //     const token = req.params.emailToken
  //     const payload = jwt.verify(token, jwt_secret)
  //     User.update({ confirmed: true }, {
  //       where: {
  //         email: payload.email
  //       }
  //     })
  //     res.status(201).send("User susccessfully confirmed");
  //   } catch (error) {
  //     console.error(error)
  //   }
  // },

  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Incorrect user or password" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Incorrect user or password" });
      }
      // if (!user.confirmed) {
      //   return res.status(400).send({ message: "Your email must be confirmed" })
      // }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Bienvenid@ " + user.name, user, token });
    });
  },

  getUserInfo(req, res) {
    User.findByPk(req.user.id, {
      include: [{ model: Order, include: [Product] }],
    })
      .then((user) => res.send(user))
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Error loading users" });
      });
  },

  async logout(req, res) {
    console.log("hola");
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },

            { token: req.headers.authorization },
          ],
        },
      });

      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .send({ message: "hubo un problema al tratar de desconectarte" });
    }
  },

  async delete(req, res) {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("El usuario ha sido eliminado con éxito");
  },

  async getAllbyUser(req, res) {
    try {
      const users = await User.findAll({
        include: [{ model: Order, include: [Product] }],
      });
      res.send({ msg: "Your products", users });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error while getting products", error });
    }
  },
};

module.exports = UserController;
