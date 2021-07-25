module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('freelances', 'developers', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('freelances', 'developers', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    });
  },
};
