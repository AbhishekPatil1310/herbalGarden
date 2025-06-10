import express from 'express';
import crypto from 'crypto';

const router = express.Router();

router.get('/session/key', (req, res) => {
  if (!req.session.aesKey) {
    const aesKey = crypto.randomBytes(32).toString('hex'); // 256-bit key
    req.session.aesKey = aesKey;
  }
  res.status(200).json({ key: req.session.aesKey });
});

export default router;
