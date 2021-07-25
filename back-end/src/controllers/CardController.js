import { Card, Freelance, Sprint } from '../models';

class CardController {
  async store(req, res) {
    const { freelanceId, sprintId, developers } = req.body;

    const freelance = await Freelance.findByPk(freelanceId);
    const sprint = await Sprint.findByPk(sprintId);

    if (!freelance) {
      return res.status(400).json({ error: 'Freelance does not exists' });
    }

    if (!sprint) {
      return res.status(400).json({ error: 'Sprint does not exists' });
    }

    if (developers && developers.length > 0) {
      const missingIds = developers.reduce((acc, curr) => {
        if (freelance.developers.includes(curr)) return acc;
        return [...acc, curr];
      }, []);

      if (missingIds.length > 0) {
        return res.status(400).json({
          error: `Missing Developers in freelance: [${missingIds.join(', ')}]`,
        });
      }
    }

    const card = await Card.create({ ...req.body, sprint_id: sprint.id });
    return res.status(201).json(card);
  }

  async show(req, res) {
    const { id } = req.params;
    const card = await Card.findByPk(id);

    if (!card) {
      return res.status(400).json({ error: 'Card does not exists' });
    }

    card.developers = await card.getDevelopers();

    return res.status(200).json(card);
  }

  async showByFreelance(req, res) {
    const { id } = req.params;
    const freelance = await Freelance.findOne({
      where: { id },
      include: [
        {
          model: Sprint,
          as: 'sprints',
          include: { model: Card, as: 'cards' },
        },
      ],
    });

    if (!freelance) {
      return res.status(400).json({ error: 'Freelance does not exists' });
    }

    let allCards = [];
    freelance.sprints.forEach((i) => allCards.push(...i.cards));

    allCards = allCards.map(async (i) => ({
      ...i.dataValues,
      developers: await i.getDevelopers(),
    }));

    return res.status(200).json(await Promise.all(allCards));
  }

  async showBySprint(req, res) {
    const { id } = req.params;
    const freelance = await Freelance.findOne({
      include: [
        {
          model: Sprint,
          as: 'sprints',
          where: { id },
          include: { model: Card, as: 'cards' },
        },
      ],
    });

    if (!freelance) {
      return res.status(400).json({ error: 'Sprint does not exists' });
    }

    const returnSprints = freelance.sprints.map(async (i) => ({
      ...i.dataValues,
      cards: await Promise.all(
        i.cards.map(async (card) => ({
          ...card.dataValues,
          developers: await card.getDevelopers(),
        }))
      ),
    }));

    return res.status(200).json(await Promise.all(returnSprints));
  }

  async update(req, res) {
    const card = await Card.findByPk(req.params.id, {
      include: {
        model: Sprint,
        as: 'sprint',
        include: {
          model: Freelance,
          as: 'freelance',
        },
      },
    });

    if (!card) {
      return res.status(400).json({ error: 'Card does not exists' });
    }

    if (req.body.developers && req.body.developers.length > 0) {
      const missingIds = req.body.developers.reduce((acc, curr) => {
        if (card.sprint.freelance.developers.includes(curr)) return acc;
        return [...acc, curr];
      }, []);

      if (missingIds.length > 0) {
        return res.status(400).json({
          error: `Missing Developers in freelance: [${missingIds.join(', ')}]`,
        });
      }
    }

    const { description, status, developers } = await card.update({
      ...req.body,
    });

    return res.status(200).json({
      description,
      status,
      developers,
    });
  }

  async delete(req, res) {
    const card = await Card.findByPk(req.params.id);

    if (!card) {
      return res.status(400).json({ error: 'Card does not exists' });
    }

    card.destroy();
    return res.status(204).json();
  }
}

export default new CardController();
