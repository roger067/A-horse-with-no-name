import { Charge, Freelance } from '../models';

class ChargeController {
  async store(req, res) {
    const { charges, freelanceId } = req.body;

    const freelance = await Freelance.findByPk(freelanceId);

    if (!freelance) {
      return res.status(401).json({ error: 'Freelance does not exists' });
    }

    charges.forEach((i) => {
      i.freelance_id = freelanceId;
    });

    try {
      const charge = await Charge.bulkCreate(charges);
      return res.status(201).json(charge);
    } catch (err) {
      return res.status(400).json({ error: 'Object sent wrongly' });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const charge = await Charge.findByPk(id, {
      include: {
        model: Freelance,
        as: 'freelance',
        attributes: ['name', 'description'],
      },
    });

    if (!charge) {
      return res.status(401).json({ error: 'Charge does not exists' });
    }

    return res.status(200).json(charge);
  }

  async update(req, res) {
    const { id } = req.params;
    const charge = await Charge.findByPk(id);

    if (!charge) {
      return res.status(401).json({ error: 'Charge does not exists' });
    }

    const { value, description } = await charge.update({ ...req.body });
    return res.status(200).json({ value, description });
  }

  async delete(req, res) {
    const { id } = req.params;
    const charge = await Charge.findByPk(id);

    if (!charge) {
      return res.status(401).json({ error: 'Charge does not exists' });
    }

    charge.destroy();

    return res.status(204).json();
  }
}

export default new ChargeController();
