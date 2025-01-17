const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
  const { name, description, instructor } = req.body;
  try {
    const course = new Course({ name, description, instructor });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Update
router.put('/:id', async (req, res) => {
  const { name, description, instructor } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, description, instructor },
      { new: true }
    );
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
