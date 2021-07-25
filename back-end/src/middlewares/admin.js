import { ROLES } from '../constants';
import { User } from '../models';

export default (requiresAdmin = true) => async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.userId, role: ROLES.ADMIN },
  });

  if (!user && requiresAdmin) {
    return res
      .status(401)
      .json({ error: "You're not supposed to do this lol" });
  }

  return next();
};
