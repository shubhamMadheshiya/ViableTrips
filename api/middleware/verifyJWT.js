const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  console.log("verifing jwt")
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403)} //invalid token

    req.user = decoded.userInfo;
    next();
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyJWT(req, res, () => {
      console.log(req.user);
      console.log(req.params.id);
    if (req.user.id === req.params.id || req.user.isAdmin) {
    
      next();
    } else {
      res.status(403).json("You are not allowed to do that!"); // Typo corrected: alowed -> allowed
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!"); // Typo corrected: alowed -> allowed
    }
  });
};

module.exports = {
  verifyJWT,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};