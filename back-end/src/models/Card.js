import Sequelize, { Model, Op } from 'sequelize';

import User from './User';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.INTEGER,
        description: Sequelize.STRING,
        developers: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sprint, {
      foreignKey: 'sprint_id',
      as: 'sprint',
    });
  }

  async getDevelopers() {
    if (!this.developers) return null;
    const developers = await User.findAll({
      where: { id: { [Op.in]: this.developers } },
      attributes: ['id', 'name', 'email', 'role'],
    });

    return developers;
  }
}

export default Card;
