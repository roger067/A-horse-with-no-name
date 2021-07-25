module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint(
            'charges',
            'charges_freelance_id_fkey'
        );
        await queryInterface.changeColumn('charges', 'freelance_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'freelances', key: 'id' },
            onDelete: 'CASCADE',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint(
            'charges',
            'charges_freelance_id_fkey'
        );
        await queryInterface.changeColumn('charges', 'freelance_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'freelances', key: 'id' },
            onDelete: 'CASCADE',
        });
    },
};
