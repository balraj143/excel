const router = require("express").Router();
const multer = require("multer");
const XLSX = require("xlsx");
const Upload = require("../models/Upload");
const { authenticateUser } = require("../middleware/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📥 POST /api/upload — Upload Excel file
router.post("/", authenticateUser, upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const uploadData = new Upload({
      filename: req.file.originalname,
      data: jsonData,
      user: req.user._id,
    });

    await uploadData.save();
    res.status(200).json({ message: "Upload successful",  uploadId: uploadData._id, });
  } catch (err) {
    res.status(500).json({ message: "Error parsing file", error: err.message });
  }
});

// 📄 GET /api/upload — Get current user's uploads
router.get("/", authenticateUser, async (req, res) => {
  try {
    const uploads = await Upload.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ uploads });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch uploads" });
  }
});

// ✏️ PUT /api/upload/:id — Update Excel file by ID
router.put("/:id", authenticateUser, upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const updated = await Upload.findByIdAndUpdate(
      req.params.id,
      {
        filename: req.file.originalname,
        data: jsonData,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Upload not found" });
    }

    res.status(200).json({ message: "Update successful", upload: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// ❌ DELETE /api/upload/:id — Delete upload by ID
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const deleted = await Upload.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Upload not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
