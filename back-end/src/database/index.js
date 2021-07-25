import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import {
  Card,
  Charge,
  Freelance,
  Sprint,
  User,
  DeveloperCard,
} from '../models';

require('dotenv/config');

const models = [Card, Charge, Freelance, Sprint, User, DeveloperCard];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
