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
      console.log('Request data:', req.body);  // Log to check incoming data
      const bagID = req.params.bagId;
      const bagData = req.body;
      console.log("Bag ID:", bagID);
      console.log("Bag data:", bagData);
  
      const updatedBag = await Bag.update(bagData, {
        where: { bagID: bagID }
      });
  
      if (updatedBag[0] === 0) {
        return res.status(404).send({ error: 'Bag not found' });
      }
      res.send({ message: 'Bag updated successfully' });
    } catch (err) {
      res.status(500).send({ error: 'An error occurred while updating the bag' });
    }
  }

,

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
  async created() {
    try {
      const response = await BagsService.index();
      this.bags = response.data;
      console.log(this.bags); // เช็คข้อมูลที่ได้จาก API
    } catch (error) {
      console.error("Error fetching bags:", error);
    }
  },
  
};
