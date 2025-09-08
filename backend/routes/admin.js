const express = require('express');
const router = express.Router();

const { authenticateUser, authenticateAdmin } = require('../middleware/auth');

const User = require('../models/User');
const Upload = require('../models/Upload');

// Get all users (admin only)
router.get('/users', authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Delete a user (admin only)
router.delete('/users/:id', authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Update a user (admin only)
router.put('/users/:id', authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    const { email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Get all uploads (admin only)
router.get('/upload', authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 }).populate("user", "email");
    
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

// Admin dashboard stats route
router.get('/stats', authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const uploadsCount = await Upload.countDocuments();

    const aiSummaries = 17; // Placeholder
    const supportTickets = 4; // Placeholder

    res.json({
      users: usersCount,
      uploads: uploadsCount,
      aiSummaries,
      supportTickets,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

router.get("/recent-uploads", authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    const uploads = await Upload.aggregate([
      { $sort: { date: -1 } }, // sort by latest upload first
      {
        $group: {
          _id: "$user", // group by user
          latestUpload: { $first: "$$ROOT" } // pick latest upload per user
        }
      },
      { $replaceWith: "$latestUpload" }, // flatten to upload format
      { $sort: { date: -1 } } // optional: sort results by most recent overall
    ]);

    res.json(uploads);
  } catch (err) {
    console.error("Error fetching recent uploads:", err);
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
});


router.get('/user-upload-stats', authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    // Aggregate upload count per user
    const uploadStats = await Upload.aggregate([
  { $sort: { date: -1 } }, // Step 1: Sort by most recent
  {                        // Step 2: Group by user
    $group: {
      _id: '$user',
      latestUpload: { $first: "$$ROOT" },
    }
  }
]);

    // Fetch user emails by IDs
    const populatedStats = await Promise.all(
      uploadStats.map(async stat => {
        const user = await User.findById(stat._id);
        return {
          email: user?.email || 'Unknown',
          uploadCount: stat.uploadCount
        };
      })
    );

    res.json(populatedStats);
  } catch (err) {
    console.error('Error in /user-upload-stats:', err);
    res.status(500).json({ error: 'Failed to fetch user upload stats' });
  }
});



module.exports = router;
