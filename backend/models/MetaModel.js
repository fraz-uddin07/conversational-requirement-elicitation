// backend/models/MetaModel.js
const mongoose = require('mongoose');

const MetaModelSchema = new mongoose.Schema({
  data: { type: Object, required: true },
});

module.exports = mongoose.model('MetaModel', MetaModelSchema);
