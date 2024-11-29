// backend/routes/conversationRoutes.js
const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const MetaModel = require('../models/MetaModel');

// Start Conversation
router.post('/start', async (req, res) => {
  const { metaModel } = req.body;
  try {
    const model = await MetaModel.findOne({ "data.name": metaModel });
    if (!model) {
      return res.status(404).json({ error: 'Meta-model not found.' });
    }

    res.status(200).json({ metaModel: model.data });
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).json({ error: 'Failed to start conversation.' });
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
