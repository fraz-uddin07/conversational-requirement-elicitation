// backend/routes/metaModelRoutes.js
const express = require('express');
const router = express.Router();
const MetaModel = require('../models/MetaModel');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Authentication Middleware
const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Unauthorized. Invalid credentials.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed.' });
  }
};

// Upload MetaModel
router.post('/upload', authenticateUser, async (req, res) => {
  try {
    const metaModel = new MetaModel({ data: req.body.fileContent });
    await metaModel.save();
    res.status(200).json({ message: 'Meta-model uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload meta-model.' });
  }
});

// Get Latest MetaModel
router.get('/', async (req, res) => {
  try {
    const metaModel = await MetaModel.findOne().sort({ _id: -1 });
    res.status(200).json(metaModel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meta-model.' });
  }
});

// Get List of MetaModels
router.get('/list', async (req, res) => {
  try {
    const metaModels = await MetaModel.find({}, { _id: 0, "data.name": 1 });
    const metaModelNames = metaModels
      .map((model) => model?.data?.name)
      .filter((name) => name !== undefined);
    res.status(200).json({ metaModels: metaModelNames });
  } catch (error) {
    console.error('Error fetching meta-model list:', error);
    res.status(500).json({ error: 'Failed to fetch meta-model list.' });
  }
});


module.exports = router;