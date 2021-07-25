import { Card, Freelance, Sprint } from '../models';

class SprintController {
  async store(req, res) {
    try {
      const { deadline, start, freelanceId } = req.body;
      const freelance = await Freelance.findByPk(freelanceId);

      if (!freelance) {
        return res.status(401).json({ error: 'Freelance does not exists' });
      }

      const sprint = await Sprint.create({
        ...req.body,
        deadline: new Date(deadline),
        start: new Date(start),
        freelance_id: freelance.id,
      });

      return res.status(201).json(sprint);
    } catch {
      return res.status(400).json({ error: 'Missing arguments' });
    }
  }

  async show(req, res) {
    const sprints = await Sprint.findAll({
      include: {
        model: Freelance,
        as: 'freelance',
        attributes: ['name'],
      },
    });
    return res.status(200).json(sprints);
  }

  async showId(req, res) {
    const sprint = await Sprint.findByPk(req.params.id);
    return res.status(200).json(sprint);
  }

  async update(req, res) {
    const sprint = await Sprint.findByPk(req.params.id);

    if (!sprint) {
      return res.status(401).json({ error: 'Sprint does not exists' });
    }

    const { status, description, deadline, start } = await sprint.update({
      ...req.body,
    });

    return res.status(200).json({ status, description, deadline, start });
  }

  async getCards(req, res) {
    const sprint = await Sprint.findByPk(req.params.id, {
      include: {
        model: Card,
        as: 'cards',
      },
    });

    const returnSprint = { ...sprint.dataValues };
    returnSprint.cards = await Promise.all(
      sprint.cards.map(async (card) => ({
        ...card.dataValues,
        developers: await card.getDevelopers(),
      }))
    );

    return res.status(200).json(returnSprint);
  }

  async delete(req, res) {
    const sprint = await Sprint.findByPk(req.params.id);

    if (!sprint) {
      return res.status(401).json({ error: 'Sprint does not exists' });
    }

    sprint.destroy();

    return res.status(204).json();
  }
}

export default new SprintController();
