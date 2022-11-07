'use strict';
const bcrypt = require('bcryptjs');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Users', [
      {
      name: 'John',
      email: 'example@example.com',
      password:bcrypt.hashSync("123456", 10),
      address:'Street 8',
      phone:'628789514',
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Paco',
      email: 'Paco@example.com',
      password: bcrypt.hashSync("123456", 10),
      address:'Street 14',
      phone:'628747614',
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  }
,

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
