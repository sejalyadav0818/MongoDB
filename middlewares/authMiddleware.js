const jwt = require("jsonwebtoken");
const key = process.env.KEY;
console.log(key);
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  jwt.verify(token, key, (err, user) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateJWT };
