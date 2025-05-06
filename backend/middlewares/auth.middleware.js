import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.replace('Bearer ', '');
    console.log("token : ", token);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decodedToken?.id).select('-password -refreshToken');

    if (!user) {
      return res.status(401).json({ message: 'Invalid Access Token' });
    }

    req.user = user;
    res.status(200).json({ user }); // ✅ Attach the user info to req.user
    next(); // ✅ move to the next middleware/controller
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({
      message: error?.message || 'Invalid access token or something went wrong',
    });
  }
};
