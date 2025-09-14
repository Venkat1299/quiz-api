const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// File paths
const questionsFile = path.join(__dirname, "../data/questions.json");
const leaderboardFile = path.join(__dirname, "../data/leaderboard.json");

// Debug: Log router initialization
console.log("🔧 Quiz router initialized");
console.log("📁 Questions file:", questionsFile);
console.log("📁 Leaderboard file:", leaderboardFile);

// ✅ GET all questions
router.get("/questions", (req, res) => {
  console.log("📝 GET /questions route hit");
  try {
    const data = JSON.parse(fs.readFileSync(questionsFile));
    console.log("✅ Questions loaded:", data.length, "questions");
    res.json(data);
  } catch (error) {
    console.error("❌ Error loading questions:", error.message);
    res.status(500).json({ error: "Failed to load questions" });
  }
});

// 🧪 Test route
router.get("/test", (req, res) => {
  console.log("🧪 GET /test route hit");
  res.json({ message: "Quiz API test route working!", timestamp: new Date().toISOString() });
});

// ✅ POST submit answers
router.post("/submit", (req, res) => {
  const { username, answers } = req.body;

  const questions = JSON.parse(fs.readFileSync(questionsFile));
  let score = 0;

  questions.forEach((q, index) => {
    if (answers[index] && answers[index] === q.answer) {
      score++;
    }
  });

  // Save result to leaderboard
  const leaderboard = JSON.parse(fs.readFileSync(leaderboardFile));
  leaderboard.push({ username, score });
  fs.writeFileSync(leaderboardFile, JSON.stringify(leaderboard, null, 2));

  res.json({ message: "Quiz submitted!", score });
});

// ✅ GET leaderboard
router.get("/leaderboard", (req, res) => {
  const leaderboard = JSON.parse(fs.readFileSync(leaderboardFile));
  res.json(leaderboard);
});

module.exports = router;
