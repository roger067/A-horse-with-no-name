module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('developer_cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      card_id: {
        type: Sequelize.INTEGER,
        references: { model: 'cards', key: 'id' },
      },

      developer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('developer_cards');
  },
};
