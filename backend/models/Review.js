const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  code: {
    type: String,
    required: true     
  },

  language: {
    type: String,
    default: 'javascript'  
  },

  hash: {                   
    type: String,
    index: true
  },

  score: {
    type: Number
  },

  issues: [
    {
      type: {
        type: String,
        enum: ['error', 'warning', 'good', 'info']
      },
      line: String,
      title: String,
      desc: String,
      fix: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;