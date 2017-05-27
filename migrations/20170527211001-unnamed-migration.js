'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.createTable(
        'faq',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          content: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          reply: {
            type: Sequelize.TEXT,
            allowNull: false
          }
        }
      )
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.dropTable('faq')
  }
};
