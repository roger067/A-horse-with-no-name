import { User } from '../models';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create(req.body);
    return res.status(201).json(user);
  }

  async showAll(req, res) {
    const users = await User.findAll();
    return res.status(200).json(users);
  }

  async update(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const { name, email, role } = await user.update({ ...req.body });
    return res.status(200).json({ name, email, role });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    user.destroy();
    return res.status(204).json();
  }
}

export default new UserController();
