const { Bag } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const bag = await Bag.create(req.body);
      res.status(201).send(bag.toJSON()); // Return the created bag with 201 status
    } catch (err) {
      res.status(500).send({
        error: 'Create bag failed. ' + err.message, // Provide specific error message
      });
    }
  },

  async index(req, res) {
    try {
      const bags = await Bag.findAll();
      res.send(bags);
    } catch (err) {
      res.status(500).send({
        error: 'Failed to retrieve bags. ' + err.message,
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
        error: 'Retrieve bag failed. ' + err.message,
      });
    }
  },

  async put(req, res) {
    try {
      const [updated] = await Bag.update(req.body, {
        where: {
          id: req.params.bagId,
        },
      });
      if (updated === 0) {
        return res.status(404).send({
          error: 'Bag not found',
        });
      }
      const updatedBag = await Bag.findByPk(req.params.bagId); // Retrieve the updated bag
      res.send(updatedBag);
    } catch (err) {
      res.status(500).send({
        error: 'Update bag failed. ' + err.message,
      });
    }
  },

  async remove(req, res) {
    try {
      const deleted = await Bag.destroy({
        where: {
          id: req.params.bagId,
        },
      });
      if (!deleted) {
        return res.status(404).send({
          error: 'Bag not found',
        });
      }
      res.send({ message: 'Bag deleted successfully' });
    } catch (err) {
      res.status(500).send({
        error: 'Delete bag failed. ' + err.message,
      });
    }
  },
};
