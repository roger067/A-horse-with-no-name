module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cards', 'sprint_id', {
      type: Sequelize.INTEGER,
      references: { model: 'sprints', key: 'id' },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('cards', 'sprint_id');
  },
};
