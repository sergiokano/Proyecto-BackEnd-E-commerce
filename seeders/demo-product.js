'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Glass',
        price: '8',
        description: 'Black Glass',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Flag',
        price: '20',
        description: 'Spain flag',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Soccer Ball',
        price: '50',
        description: 'Madrid Ball',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Running Shoes',
        price: '90',
        description: 'Nike Running Shoes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Phone',
        price: '400',
        description: 'Samsung Phone',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
