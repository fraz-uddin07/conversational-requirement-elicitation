// backend/routes/metaModelRoutes.js
const express = require('express');
const router = express.Router();
const MetaModel = require('../models/MetaModel');

// Upload MetaModel
router.post('/upload', async (req, res) => {
  try {
    const metaModel = new MetaModel({ data: req.body });
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

module.exports = router;
