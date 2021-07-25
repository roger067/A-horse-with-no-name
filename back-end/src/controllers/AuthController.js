import jwt from 'jsonwebtoken';

import { User } from '../models';
import authConfig from '../config/auth';

class AuthController {
  async store(req, res) {
    const { email = '', password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, role } = user;
    return res.status(200).json({
      user: {
        id,
        name,
        email,
        role,
      },

      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new AuthController();
