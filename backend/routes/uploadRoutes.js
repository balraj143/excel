const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const { authenticateUser } = require("../middleware/authMiddleware");
const { generateSummaryWithOpenAI } = require("../utils/openai");


const Upload = require("../models/Upload");

const router = express.Router();

// Setup multer to store files in /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 📥 Upload route with Excel parsing and AI summary
router.post("/", authenticateUser, upload.single("file"), async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "uploads", req.file.filename);

    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Generate AI summary
    const summary = await generateSummaryWithOpenAI(jsonData);

    // Save upload in DB
    const newUpload = new Upload({
      filename: req.file.originalname,
      user: req.user._id,
      date: new Date(),
      summary,
    });

    await newUpload.save();
console.log("New Upload:", newUpload);
    res.status(200).json({
      message: "File uploaded successfully",
      upload: newUpload._id,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to upload and process file" });
  }
});

// 📊 Monthly Upload Summary Route
router.get("/monthly-summary", authenticateUser, async (req, res) => {
  try {
    const summary = await Upload.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(summary);
  } catch (err) {
    console.error("Monthly Summary Error:", err);
    res.status(500).json({ error: "Failed to fetch monthly summary" });
  }
});

// ✅ 📄 AI Summary route
router.get("/:id/summary", authenticateUser, async (req, res) => {
  try {
    const upload = await Upload.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!upload) {
      return res.status(404).json({ error: "Upload not found" });
    }

    // ⚠️ If already has summary, return it
    if (upload.summary) {
      return res.json({ summary: upload.summary });
    }

    // 🧠 Generate AI summary
    const aiSummary = await generateSummaryWithOpenAI(upload.data);

    // 💾 Save summary to MongoDB
    upload.summary = aiSummary;
    await upload.save();

    res.json({ summary: aiSummary });
  } catch (err) {
    console.error("AI Summary Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch AI summary" });
  }
});


module.exports = router;
