import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decodedToken?.id).select(
      '-password -refreshToken'
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid Access Token' });
    }

    // Attach user to request
    req.user = user;

    // Check if this is being used as a standalone endpoint (like /me)
    if (req.route && req.route.path === '/me') {
      return res.json(user);
    }

    // Otherwise continue to next middleware/controller
    return next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({
      message: error?.message || 'Invalid access token',
    });
  }
};
