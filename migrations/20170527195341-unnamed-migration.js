'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'questions',
      'resolved',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    ),
    queryInterface.addColumn(
      'problems',
      'resolved',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    ),
    queryInterface.renameColumn('presponses', 'q_id', 'p_id')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('questions', 'resolved'),
    queryInterface.removeColumn('problems', 'resolved'),
    queryInterface.renameColumn('presponses', 'p_id', 'q_id')
  }
};
