module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('freelances', 'developers', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    });
    await queryInterface.addColumn('cards', 'developers', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('freelances', 'developers');
    await queryInterface.removeColumn('cards', 'developers');
  },
};
