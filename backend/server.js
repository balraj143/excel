require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Vite local
  "http://localhost:3000", // CRA local
  "https://excel-frontend-edvk.onrender.com", // Render frontend
];


app.use(cors({
  origin: "https://excel-frontend-edvk.onrender.com", // your frontend domain
  credentials: true, // allow cookies/headers
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use("/api/upload", require("./routes/upload"));
app.use('/api/admin', adminRoutes);
app.use("/api/upload", uploadRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
