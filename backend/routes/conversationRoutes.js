// backend/routes/conversationRoutes.js
const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const MetaModel = require('../models/MetaModel');

// Start Conversation
router.post('/start', async (req, res) => {
  try {
    const metaModel = await MetaModel.findOne().sort({ _id: -1 });
    res.status(200).json({ metaModel: metaModel.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start conversation. Unable to fetch Meta-Model from Server' });
  }
});

// Save Conversation
router.post('/save', async (req, res) => {
  try {
    const conversation = new Conversation({
      userResponses: req.body.userResponses,
      summary: req.body.summary,
    });
    await conversation.save();
    res.status(200).json({ message: 'Conversation saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save conversation.' });
  }
});

module.exports = router;
