const Review = require('../models/Review');
const Groq = require('groq-sdk');

// Replace Gemini client with Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SUPPORTED_LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'cpp', 'go', 'rust'];

const createReview = async (req, res) => {
  const { code, language = 'javascript' } = req.body;

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
    const prompt = `You are a strict code reviewer.
Review this ${language} code and respond ONLY with a valid JSON object.
No markdown, no backticks, no extra text outside the JSON.

JSON structure:
{
  "score": <number 0-100>,
  "issues": [
    {
      "type": "error" | "warning" | "good" | "info",
      "line": "<e.g. Line 3>",
      "title": "<short title>",
      "desc": "<clear explanation>",
      "fix": "<fixed code or empty string>"
    }
  ]
}

Code to review:
\`\`\`${language}
${code}
\`\`\``;

    // Groq API call
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,  // lower = more consistent JSON output
    });

    // Extract text — same idea as before
    const raw = response.choices[0].message.content;
    const clean = raw.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    // Save to MongoDB
    const saved = await Review.create({
      user : req.user._id,
      code,
      language,
      score: result.score,
      issues: result.issues,
    });

    return res.status(201).json(saved);

  } catch (err) {
    console.error('createReview error:', err.message);

    if (err.message.includes('429')) {
      return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
    }
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: 'AI returned invalid response. Try again.' });
    }

    return res.status(500).json({ error: 'Review failed. Please try again.' });
  }
};

// Keep getHistory, getReviewById, deleteReview exactly the same
const getHistory = async (req, res) => {
  try {
    const history = await Review.find({user:req.user._id})
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
    const review = await Review.findOne({_id: req.params.id,
  user: req.user._id, });
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
    const data = await Review.findOneAndDelete({_id: req.params.id,
  user: req.user._id,});
    if (!data) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    return res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (err) {
    console.error('deleteReview error:', err.message);
    return res.status(500).json({ error: 'Failed to delete review.' });
  }
};

module.exports = { createReview, getHistory, getReviewById, deleteReview };