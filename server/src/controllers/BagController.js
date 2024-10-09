const { Bag } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const bag = await Bag.create(req.body);
      res.send(bag.toJSON());
    } catch (err) {
      res.status(500).send({
        error: 'Create bag failed',
      });
    }
  },

  async index(req, res) {
    try {
      const bags = await Bag.findAll();
      res.send(bags);
    } catch (err) {
      res.status(500).send({
        error: 'The bags information was incorrect',
      });
    }
  },

  async show(req, res) {
    try {
      const bag = await Bag.findByPk(req.params.bagId);
      if (!bag) {
        return res.status(404).send({
          error: 'Bag not found',
        });
      }
      res.send(bag);
    } catch (err) {
      res.status(500).send({
        error: 'Retrieve bag failed',
      });
    }
  },

  async put(req, res) {
    try {
      const updated = await Bag.update(req.body, {
        where: {
          id: req.params.bagId,
        },
      });
      if (updated[0] === 0) {
        return res.status(404).send({
          error: 'Bag not found',
        });
      }
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: 'Update bag failed',
      });
    }
  },

  async remove(req, res) {
    try {
      const bag = await Bag.findOne({
        where: {
          id: req.params.bagId,
        },
      });
      if (!bag) {
        return res.status(404).send({
          error: 'Bag not found',
        });
      }
      await bag.destroy();
      res.send(bag);
    } catch (err) {
      res.status(500).send({
        error: 'Delete bag failed',
      });
    }
  },
};
