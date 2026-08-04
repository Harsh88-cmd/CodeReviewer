const express = require('express');
const router = express.Router();
const protect  = require('../middleware/auth.js'); 
const rateLimiter = require("../middleware/rateLimiter.js");


const {createReview, getHistory, getReviewById, deleteReview , getJobStatus} = require('../controllers/reviewController');

router.post("/", rateLimiter, protect, createReview);

router.get('/history',protect,getHistory);
router.get('/:id',protect,getReviewById);
router.delete('/:id',protect,deleteReview)
router.get('/status/:jobId', protect, getJobStatus);

module.exports = router;