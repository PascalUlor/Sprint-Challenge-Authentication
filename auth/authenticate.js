const jwt = require('jsonwebtoken');
const requestHelper = require('../helpers');

const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';

// quickly see what this file exports
module.exports = {
  authenticate,
  createToken
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
}

const createToken = (res, statusCode, message, user) => {
  const payload = {
    username: user.username
  };
  const token = jwt.sign(payload, jwtKey, {
    expiresIn: 60 * 60 * 1440
  });
  const logInfo = {
    payload,
    token
  };
  requestHelper.success(res, statusCode, message, logInfo);
};
