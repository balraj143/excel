const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const Upload = require('../models/Upload');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const record = new Upload({
    userId: req.body.userId,
    fileName: req.file.originalname,
    data
  });
  await record.save();

  res.json(record);
});

router.get('/:userId/history', async (req, res) => {
  const uploads = await Upload.find({ userId: req.params.userId });
  res.json(uploads);
});

module.exports = router;