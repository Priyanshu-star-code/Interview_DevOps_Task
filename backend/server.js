const express = require("express");
const app = express();
const PORT = 5000;

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js Backend 🚀" });
});


app.get("/", (req, res) => {
  res.send("✅ Backend is running! Use /api/hello for API");
});


app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
