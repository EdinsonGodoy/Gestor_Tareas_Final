const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization'); // Debe llamarse EXACTAMENTE 'Authorization'

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    if (!verified || !verified.userId) {
      return res.status(401).json({ error: 'Token inválido o no contiene userId' });
    }

    req.user = verified; // { userId, username, iat, exp }
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido o expirado.' });
  }
};
