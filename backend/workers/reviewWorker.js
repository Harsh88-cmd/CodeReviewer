require("dotenv").config();
const mongoose = require("mongoose");
const { Worker } = require("bullmq");
const Groq = require("groq-sdk");
const Review = require("../models/Review");
const connection = require("../config/redis");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Worker connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log("Worker initialized and listening for jobs...");

const worker = new Worker(
  "review-queue",
  async (job) => {
      console.log("📥 Worker received job:", job.id);
    const start = Date.now();
    const { userId, code, language, hash } = job.data;

    // Use a prefixed key to keep your Redis storage clean
    const cacheKey = `cache:review:${hash}`;

    // 1. Check Redis cache
    const cached = await connection.get(cacheKey);

    if (cached) {
      const parsed = JSON.parse(cached);

      // Create a new history record for this user from the cached result
      const saved = await Review.create({
        user: userId,
        code,
        language,
        score: parsed.score,
        issues: parsed.issues,
      });

      console.log(`[${job.id}] cache HIT — total ${Date.now() - start}ms`);
      return saved;
    }

    // 2. AI Prompt (Exactly as you provided)
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

    // 3. Call Groq AI
    const aiStart = Date.now();
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });
    console.log(`[${job.id}] groq call took ${Date.now() - aiStart}ms`);

    const raw = response.choices[0].message.content;

    // 4. Robust JSON Parsing
    // This regex ensures we extract the JSON object even if the AI adds markdown backticks
    let result;
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      const cleanJson = jsonMatch ? jsonMatch[0] : raw;
      result = JSON.parse(cleanJson);
    } catch (err) {
      console.error("AI Response Parsing Error. Raw content:", raw);
      throw new Error("Failed to parse AI response into valid JSON.");
    }

    // 5. Store result in Redis cache for 1 hour
    await connection.set(cacheKey, JSON.stringify(result), "EX", 3600);

    // 6. Save history to MongoDB
    const saved = await Review.create({
      user: userId,
      code,
      language,
      score: result.score,
      issues: result.issues,
      hash, // Recommended: store the hash in your DB too for easier lookups
    });

    console.log(`[${job.id}] cache MISS — total ${Date.now() - start}ms`);
    return saved;
  },
  {
    connection,
    concurrency: 5, // Processes up to 5 reviews at once
  }
);

// Monitoring
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});