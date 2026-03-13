const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Index shortId for faster lookups when redirecting
urlSchema.index({ shortId: 1 });

module.exports = mongoose.model('Url', urlSchema);
