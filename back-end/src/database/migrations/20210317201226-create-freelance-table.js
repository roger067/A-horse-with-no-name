module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('freelances', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },

      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
      },

      name: {
        type: Sequelize.STRING,
      },

      stack: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
    await queryInterface.dropTable('freelances');
  },
};
