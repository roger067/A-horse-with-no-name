module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'sprints',
      'sprints_freelance_id_fkey'
    );
    await queryInterface.changeColumn('sprints', 'freelance_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'freelances', key: 'id' },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'sprints',
      'sprints_freelance_id_fkey'
    );
    await queryInterface.changeColumn('sprints', 'freelance_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'freelances', key: 'id' },
      onDelete: 'CASCADE',
    });
  },
};
