const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const multer = require("multer");
const path = require("path"); // ✅ IMPORTANT

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// File upload setup
const upload = multer({ dest: "uploads/" });

// Read CSV function
const readCSV = (filePath, res) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => res.json(results))
    .on("error", (err) => {
      console.error("Error reading CSV:", err);
      res.status(500).send("Error reading file");
    });
};

// ================== APIs ==================

// ✅ Jobs API (FIXED PATH)
app.get("/jobs", (req, res) => {
  const filePath = path.join(__dirname, "data", "jobs.csv");
  readCSV(filePath, res);
});

// ✅ Entertainment API (FIXED PATH)
app.get("/entertainment", (req, res) => {
  const filePath = path.join(__dirname, "data", "entertainment.csv");
  readCSV(filePath, res);
});

// ✅ Mental Health API (FIXED PATH)
app.get("/mental-health", (req, res) => {
  const filePath = path.join(__dirname, "data", "mental.csv");
  readCSV(filePath, res);
});

// ================== Upload API ==================
app.post("/upload", upload.single("file"), (req, res) => {
  const tempPath = req.file.path;

  // ✅ FIXED PATH
  const targetPath = path.join(__dirname, "data", req.file.originalname);

  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file");
    }
    res.send("File uploaded successfully");
  });
});

// ================== Update Jobs API ==================
app.post("/update-jobs", (req, res) => {
  const updatedData = req.body;

  const csvData = updatedData
    .map(obj =>
      `${obj.title},${obj.salary},${obj.experience},${obj.location}`
    )
    .join("\n");

  const filePath = path.join(__dirname, "data", "jobs.csv");

  fs.writeFile(filePath, csvData, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating file");
    }
    res.send("Updated successfully");
  });
});

// ================== Start Server ==================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});