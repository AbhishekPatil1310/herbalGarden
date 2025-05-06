// Import User model
import User from '../models/user.model.js';

export const trackPlantVisit = async (req, res) => {
  try {
    // Safe check: is user authenticated?
    if (!req.user || !req.user._id) {
      return res.status(401).json({ status: false, message: 'Unauthorized access' });
    }

    const userIs = req.user._id;
    const { cubeName } = req.body;

    console.log("Cube clicked:", cubeName);
    console.log("User ID:", userIs);

    if (!cubeName) {
      return res.status(400).json({ status: false, message: 'Plant name is required' });
    }

    // Find the user by _id
    const user = await User.findById(userIs);

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Check if the plant was already visited
    const visitIndex = user.visitedPlants.findIndex(
      (p) => p.plant_id === cubeName
    );

    if (visitIndex !== -1) {
      user.visitedPlants[visitIndex].visitCount += 1;
    } else {
      user.visitedPlants.push({ plant_id: cubeName, visitCount: 1 });
    }

    await user.save();

    return res.status(200).json({
      status: true,
      message: 'Plant visit tracked successfully',
      visitedPlants: user.visitedPlants,
    });
  } catch (error) {
    console.error('Error tracking plant visit:', error.message);
    if (!res.headersSent) {   // 🛡️ Safe fallback
      return res.status(500).json({ status: false, message: 'Server error' });
    }
  }
};
