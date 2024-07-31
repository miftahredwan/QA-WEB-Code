const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: "Access denied, token missing!" });
  }
  const token=authHeader.split(' ')[1]
  console.log(authHeader)
  console.log(token)
  try {
    const {username, userid, profileImage} = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {username, userid, profileImage};
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
