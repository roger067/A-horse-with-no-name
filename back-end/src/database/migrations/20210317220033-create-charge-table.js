module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('charges', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            freelance_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'freelances', key: 'id' },
            },

            value: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },

            description: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('charges');
    },
};
