module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sprints', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      freelance_id: {
        type: Sequelize.INTEGER,
        references: { model: 'freelances', key: 'id' },
      },

      start: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sprints');
  },
};
