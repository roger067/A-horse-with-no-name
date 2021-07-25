import { Op } from 'sequelize';
import { Card, Charge, Freelance, Sprint, User } from '../models';
import { ROLES, STATUS_FREELANCE } from '../constants';

const filterByStatus = (freelances, status) =>
  freelances.filter((i) => i.status === status);

class FreelanceController {
  async store(req, res) {
    const { customerEmail, price, developers = [] } = req.body;
    const customer = await User.findOne({ where: { email: customerEmail } });

    if (!customer) {
      return res.status(401).json({ error: 'Customer does not exists' });
    }

    if (developers.length) {
      let allDevelopers = await User.findAll({
        where: {
          id: { [Op.in]: developers },
          role: { [Op.or]: [ROLES.ADMIN, ROLES.DEVELOPER] },
        },
      });

      allDevelopers = allDevelopers.map((i) => i.id);
      const missingIds = developers.reduce((acc, curr) => {
        if (allDevelopers.includes(curr)) return acc;
        return [...acc, curr];
      }, []);

      if (missingIds.length > 0) {
        return res.status(400).json({
          error: `Missing Developers in database: [${missingIds.join(', ')}]`,
        });
      }
    }

    const freelance = await Freelance.create({
      customer_id: customer.id,
      stack: req.body.stacks.split(','),
      ...req.body,
    });

    Charge.create({
      freelance_id: freelance.id,
      value: price,
      description: 'Freelance price',
    });

    return res.status(201).json(freelance);
  }

  async calculateProfit(req, res) {
    const freelances = await Freelance.findAll({
      where: { status: STATUS_FREELANCE.COMPLETED },
      include: {
        model: Charge,
        as: 'charges',
        attributes: ['id', 'description', 'value'],
      },
      attributes: ['id', 'name'],
    });

    const returnObj = {
      freelances: freelances.map((i) => ({
        ...i.dataValues,
        total: i.charges.reduce((acc, curr) => acc + Number(curr.value), 0),
      })),
    };

    returnObj.total = returnObj.freelances.reduce(
      (acc, curr) => acc + curr.total,
      0
    );

    return res.status(200).json(returnObj);
  }

  async show(req, res) {
    const freelances = await Freelance.findAll({
      include: [
        { model: User, as: 'customer' },
        { model: Charge, as: 'charges' },
      ],
    });

    const returnFreelance = freelances.map(async (freelance) => ({
      ...freelance.dataValues,
      developers: await freelance.getDevelopers(),
    }));

    return res.status(200).json(await Promise.all(returnFreelance));
  }

  async showId(req, res) {
    const { id } = req.params;
    const freelance = await Freelance.findByPk(id, {
      include: [
        { model: User, as: 'customer' },
        { model: Charge, as: 'charges' },
      ],
    });

    if (!freelance) {
      return res.status(401).json({ error: 'Freelance does not exists' });
    }

    freelance.developers = await freelance.getDevelopers();

    return res.status(200).json(freelance);
  }

  async update(req, res) {
    const { customerEmail, developers = [] } = req.body;

    const freelance = await Freelance.findByPk(req.params.id);

    if (!freelance) {
      return res.status(401).json({ error: 'Freelance does not exists' });
    }

    if (customerEmail) {
      const customer = await User.findOne({ where: { email: customerEmail } });
      if (customer) {
        req.body.customer_id = customer.id;
      }
    }

    if (developers.length) {
      let allDevelopers = await User.findAll({
        where: {
          id: { [Op.in]: developers },
          role: { [Op.or]: [ROLES.ADMIN, ROLES.DEVELOPER] },
        },
      });

      allDevelopers = allDevelopers.map((i) => i.id);
      const missingIds = developers.reduce((acc, curr) => {
        if (allDevelopers.includes(curr)) return acc;
        return [...acc, curr];
      }, []);

      if (missingIds.length > 0) {
        return res.status(400).json({
          error: `Missing Developers in database: [${missingIds.join(', ')}]`,
        });
      }
    }

    const updatedFreelance = await freelance.update(req.body);
    return res.status(200).json(updatedFreelance);
  }

  async delete(req, res) {
    const freelance = await Freelance.findByPk(req.params.id);

    if (!freelance) {
      return res.status(401).json({ error: 'Freelance does not exists' });
    }

    freelance.destroy();

    return res.status(204).json();
  }

  async generateRelatory(req, res) {
    const freelance = await Freelance.findByPk(req.params.id, {
      include: [
        { model: User, as: 'customer', attributes: ['name', 'email'] },
        { model: Charge, as: 'charges' },
        { model: Sprint, as: 'sprints', include: { model: Card, as: 'cards' } },
      ],
    });

    if (!freelance) {
      return res.status(400).json({ error: 'Freelance does not exists' });
    }

    const returnFreelance = {
      ...freelance.dataValues,
      developers: await freelance.getDevelopers(),
    };

    return res.status(200).json(returnFreelance);
  }

  async getFreelancesGraph(req, res) {
    const freelances = await Freelance.findAll({
      include: [
        { model: Sprint, as: 'sprints', include: { model: Card, as: 'cards' } },
        {
          model: Charge,
          as: 'charges',
          attributes: ['id', 'description', 'value'],
        },
      ],
    });

    const { COMPLETED, PAUSED, DOING } = STATUS_FREELANCE;
    const totalSprints = freelances.reduce(
      (acc, curr) => acc + curr.sprints.length,
      0
    );

    const prices = freelances.reduce((acc, curr) => {
      const { charges: c } = curr;
      const total = c.reduce((cAcc, cCurr) => cAcc + Number(cCurr.value), 0);
      acc.push(total);
      return acc;
    }, []);

    const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);

    const returnObj = {
      completed: filterByStatus(freelances, COMPLETED).length,
      paused: filterByStatus(freelances, PAUSED).length,
      doing: filterByStatus(freelances, DOING).length,
      highestValue: Math.max(...prices),
      lowestValue: Math.min(...prices),
      mediaValue: totalPrice / prices.length,
      totalSprints,
    };

    return res.status(200).json(returnObj);
  }
}

export default new FreelanceController();
