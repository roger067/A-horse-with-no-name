import Sequelize, { Model } from 'sequelize';

class Sprint extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.INTEGER,
        description: Sequelize.STRING,
        deadline: Sequelize.DATE,
        start: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Freelance, {
      foreignKey: 'freelance_id',
      as: 'freelance',
    });

    this.hasMany(models.Card, {
      foreignKey: 'sprint_id',
      as: 'cards',
    });
  }
}

export default Sprint;
