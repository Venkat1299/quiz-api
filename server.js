const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Import routes
try {
  const quizRoutes = require("./routes/quiz.routes");
  console.log("✅ Quiz routes loaded successfully");
  console.log("📋 Available routes:", quizRoutes.stack?.map(layer => layer.route?.path) || "No routes found");
  app.use("/api/quiz", quizRoutes);
  console.log("🔗 Routes mounted at /api/quiz");
} catch (err) {
  console.error("❌ Error loading quiz routes:", err.message);
}

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Quiz API 🚀");
});

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
