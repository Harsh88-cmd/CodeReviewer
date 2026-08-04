require("dotenv").config();

const Review = require('../models/Review');
const crypto = require('crypto');
const reviewQueue = require('../queue/reviewQueue');

const SUPPORTED_LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'cpp', 'go', 'rust'];

function normalizeCode(code) {
  return code
    .replace(/\/\/.*$/gm, '')           // single-line comments hatao (//)
    .replace(/\/\*[\s\S]*?\*\//g, '')   // multi-line comments hatao (/* */)
    .replace(/#.*$/gm, '')              // python-style comments (#) bhi hatao
    .replace(/\s+/g, ' ')               // multiple spaces/tabs/newlines ko single space
    .trim();
}

const createReview = async (req, res) => {
  console.log(" NEW createReview CODE RUNNING ");

  const { code, language = 'javascript' } = req.body;

  //
  if (!code || !code.trim()) {
    return res.status(400).json({ error: 'Code is required.' });
  }

  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return res.status(400).json({ error: 'Unsupported language.' });
  }

  if (code.length > 5000) {
    return res.status(400).json({ error: 'Code too long (max 5000 characters).' });
  }

  try {

    // Create hash for deduplication + caching
    const hash = crypto
      .createHash('sha256')
      .update(normalizeCode(code))
      .digest('hex');

    //  Add job to queue
    const job = await reviewQueue.add(
      'review-job',
      {
        userId: req.user._id,
        code,
        language,
        hash
      },
      {
        jobId: hash,
        removeOnComplete: { age: 3600 }, // ✅ change ye line
        removeOnFail: true
      }
    );
    return res.status(202).json({
      message: 'Review job queued',
      jobId: job.id
    });

  } catch (err) {

    console.error('createReview error:', err.message);

    if (err.message.includes('429')) {
      return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
    }

    return res.status(500).json({ error: 'Review failed. Please try again.' });
  }
};

// getHistory, getReviewById, deleteReview 
const getHistory = async (req, res) => {
  try {
    const history = await Review.find({ user: req.user._id })
      .select('language score createdAt issues')
      .sort({ createdAt: -1 })
      .limit(20);
    return res.json(history);
  } catch (err) {
    console.error('getHistory error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch history.' });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    return res.json(review);
  } catch (err) {
    console.error('getReviewById error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch review.' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const data = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!data) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    return res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (err) {
    console.error('deleteReview error:', err.message);
    return res.status(500).json({ error: 'Failed to delete review.' });
  }
};

const getJobStatus = async (req, res) => {
  try {
    const job = await reviewQueue.getJob(req.params.jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found.' });
    }

    const state = await job.getState();

    if (state === 'completed') {
      return res.json({ status: 'completed', result: job.returnvalue });
    }

    if (state === 'failed') {
      return res.json({ status: 'failed', error: job.failedReason });
    }

    return res.json({ status: state }); // waiting, active, delayed
  } catch (err) {
    console.error('getJobStatus error:', err.message);
    return res.status(500).json({ error: 'Failed to check job status.' });
  }
};

module.exports = { createReview, getHistory, getReviewById, deleteReview, getJobStatus };