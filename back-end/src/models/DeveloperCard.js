import { Model } from 'sequelize';

class DeveloperCard extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'developer_id',
      as: 'developer',
    });

    this.belongsTo(models.Card, {
      foreignKey: 'card_id',
      as: 'card',
    });
  }
}

export default DeveloperCard;
