import Sequelize, { Model, Op } from 'sequelize';

import User from './User';

class Freelance extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.INTEGER,
        description: Sequelize.STRING,
        name: Sequelize.STRING,
        stack: Sequelize.ARRAY(Sequelize.STRING),
        developers: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'customer_id',
      as: 'customer',
    });
    this.hasMany(models.Charge, {
      foreignKey: 'freelance_id',
      as: 'charges',
    });

    this.hasMany(models.Sprint, {
      foreignKey: 'freelance_id',
      as: 'sprints',
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

export default Freelance;
