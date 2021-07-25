import { Op } from 'sequelize';
import { ROLES } from '../constants';
import { User } from '../models';

export default (requiresDeveloper = true) => async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.userId,
      role: { [Op.or]: [ROLES.ADMIN, ROLES.DEVELOPER] },
    },
  });

  if (!user && requiresDeveloper) {
    return res
      .status(401)
      .json({ error: "You're not supposed to do this lol" });
  }

  return next();
};
