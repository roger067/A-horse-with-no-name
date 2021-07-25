module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'developer_cards',
      'developer_cards_card_id_fkey'
    );
    await queryInterface.changeColumn('developer_cards', 'card_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'cards', key: 'id' },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'developer_cards',
      'developer_cards_card_id_fkey'
    );
    await queryInterface.changeColumn('developer_cards', 'card_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'cards', key: 'id' },
      onDelete: 'CASCADE',
    });
  },
};
