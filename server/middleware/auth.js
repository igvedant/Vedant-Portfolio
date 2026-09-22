const jwt = require('jsonwebtoken');

const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Access restricted to portfolio owner.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'vedant_super_secure_jwt_secret_token_key_2026');
    if (decoded.email !== (process.env.ADMIN_EMAIL || 'igvedant01@gmail.com')) {
      return res.status(403).json({ success: false, message: 'Forbidden: Invalid owner credentials.' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
};

module.exports = { requireAdminAuth };
