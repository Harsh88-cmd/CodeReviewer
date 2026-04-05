const express = require('express');
const router = express.Router();
const protect  = require('../middleware/auth'); 

const {
  createReview,
  getHistory,
  getReviewById,
  deleteReview,
} = require('../controllers/reviewController');

router.post('/', protect , createReview);
router.get('/history',protect,getHistory);
router.get('/:id',protect,getReviewById);
router.delete('/:id',protect,deleteReview)

module.exports = router;