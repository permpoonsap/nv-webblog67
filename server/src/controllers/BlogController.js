const { Blog } = require('../models');

module.exports = {
  
  async index(req, res) {
    try {
      const blogs = await Blog.findAll();
      res.send(blogs);
    } catch (err) {
      res.status(500).send({
        error: 'The blogs information was incorrect',
      });
    }
  },

  
  async create(req, res) {
    try {
      const blog = await Blog.create(req.body);
      res.send(blog.toJSON());
    } catch (err) {
      res.status(500).send({
        error: 'Create blog failed',
      });
    }
  },

  
  async put(req, res) {
    try {
      const updated = await Blog.update(req.body, {
        where: {
          id: req.params.blogId,
        },
      });
      if (updated[0] === 0) {
        return res.status(404).send({
          error: 'Blog not found',
        });
      }
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: 'Update blog failed',
      });
    }
  },

  
  async remove(req, res) {
    try {
      const blog = await Blog.findOne({
        where: {
          id: req.params.blogId,
        },
      });
      if (!blog) {
        return res.status(404).send({
          error: 'Blog not found',
        });
      }
      await blog.destroy();
      res.send(blog);
    } catch (err) {
      res.status(500).send({
        error: 'Delete blog failed',
      });
    }
  },

  
  async show(req, res) {
    try {
      const blog = await Blog.findByPk(req.params.blogId);
      if (!blog) {
        return res.status(404).send({
          error: 'Blog not found',
        });
      }
      res.send(blog);
    } catch (err) {
      res.status(500).send({
        error: 'Retrieve blog failed',
      });
    }
  },
};
