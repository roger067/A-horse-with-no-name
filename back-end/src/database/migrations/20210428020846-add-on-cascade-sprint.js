module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('cards', 'cards_sprint_id_fkey');
    await queryInterface.changeColumn('cards', 'sprint_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'sprints', key: 'id' },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('cards', 'cards_sprint_id_fkey');
    await queryInterface.changeColumn('cards', 'sprint_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'sprints', key: 'id' },
      onDelete: 'CASCADE',
    });
  },
};
