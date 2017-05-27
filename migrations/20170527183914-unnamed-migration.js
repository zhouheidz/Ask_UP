'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'qresponses',
      'image',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      }
    ),
    queryInterface.changeColumn(
      'presponses',
      'image',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'qresponses',
      'image',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      }
    ),
    queryInterface.changeColumn(
      'presponses',
      'image',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      }
    )
  }
};
