'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'vgmonterozo@up.edu.ph',
      name: 'Vergel Joseph G. Monterozo',
      role: 'admin'
    },{
      email: 'croxas@up.edu.ph',
      name: 'Claire Rojas',
      role: 'admin'
    },{
      email: 'kamarinduque@up.edu.ph',
      name: 'Kelly A. Marinduque',
      role: 'admin'
    }, {
      email: 'huchiu@up.edu.ph',
      name: 'Heidi Angela U. Chiu',
      role: 'student'
    }]);
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('users', null, {});
  }
};
