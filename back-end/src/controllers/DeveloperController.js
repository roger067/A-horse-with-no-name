import { Op } from 'sequelize';
import { ROLES } from '../constants';
import { Card, DeveloperCard, User } from '../models';

class DeveloperController {
  async attainToCard(req, res) {
    const { developerId, cardId } = req.body;

    const developer = await User.findOne({
      where: {
        id: developerId,
        role: { [Op.or]: [ROLES.ADMIN, ROLES.DEVELOPER] },
      },
    });

    if (!developer) {
      return res.status(401).json({ error: 'Developer does not exists' });
    }

    const card = await Card.findOne({
      where: { id: cardId },
    });

    if (!card) {
      return res.status(401).json({ error: 'Card does not exists' });
    }

    const developerCard = await DeveloperCard.create({
      card_id: card.id,
      developer_id: developer.id,
    });

    return res.status(201).json(developerCard);
  }
}

export default new DeveloperController();
