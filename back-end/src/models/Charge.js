import Sequelize, { Model } from 'sequelize';

class Charge extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.DECIMAL,
        description: Sequelize.STRING,
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
  }
}

export default Charge;
