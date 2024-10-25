const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reporting_tool', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const metaModelRoutes = require('./routes/metaModelRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

app.use('/api/meta-model', metaModelRoutes);
app.use('/api/conversation', conversationRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
