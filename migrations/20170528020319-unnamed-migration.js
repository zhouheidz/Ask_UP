'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('faqs', [{
      content: 'problem #1',
      reply: 'reply to #1'
    },{
      content: 'problem #2',
      reply: 'reply to #2'
    },{
      content: 'problem #3',
      reply: 'reply to #1'
    }]);
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('faqs', null, {});
  }
};
