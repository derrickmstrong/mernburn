// Import express + Initialize router, mongoose
const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

// Setup Models
const blogSchema = require('../models/blog'),
  blogModel = mongoose.model('blog', blogSchema);

// Setup Routes
router
  // Test Route
  .get('/hello', async (req, res) => {
    await res.send('Hello Mario World!');
  })

  // Post Route
  .post('/blog/post', async (req, res) => {
    // Create new blog from body
    let blog = new blogModel(req.body);
    // Save blog to DB
    await blog.save((err, blogModel) => {
      if (err) res.send(err); // if err send err
      res.json(blog); // Otherwise respond by sending blog to DB
    });
  })

  // Get (All) Route
  .get('/blogs', async (req, res) => {
    // Find all blogs
    await blogModel.find({}, (err, blogs) => {
      if (err) res.send(err); // if err send err
      res.json(blogs); // Respond with blogs
    });
  })

  // Get (By Id) Route
  .get('/blog/:id', async (req, res) => {
    await blogModel.findById(req.params.id, (err, blog) => {
      if (err) res.send(err); // if err, send err
      res.json(blog); // Respond with blog
    });
  })

  // Update/Patch Route
  .patch('/blog/:id', async (req, res) => {
    await blogModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) res.send(err); // if err, send err
      res.json({ message: 'Blog updated' }); // Respond with success message
    });
  })

  // Delete Route
  .delete('/blog/:id', async (req, res) => {
    await blogModel.deleteOne(
      {
        _id: req.params.id,
      },
      (err) => {
        if (err) res.send(err); // if err, send err
        res.json({ message: 'Blog has been deleted successfully' }); // Respond with success message
      }
    );
  });

// Export Router
module.exports = router;
