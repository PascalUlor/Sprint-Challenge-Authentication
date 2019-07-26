const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const requestHelper = require('../helpers');

const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';

// implementation details
function authenticate(req, res, next) {
  // const token = req.get('Authorization');
  const token = req.headers.authorization;

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

const validatePassword = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const check = await userModel.findUser(username).first();
    const checkPassword = await bcrypt.compareSync(password, check.password);
    if (check.username === username && checkPassword) {
      // eslint-disable-next-line require-atomic-updates
      req.user = check;
      next();
    }
    return requestHelper.error(res, 400, 'wrong credentials');
  } catch (err) {
    err;
  }
};

// quickly see what this file exports
module.exports = {
  authenticate,
  createToken,
  validatePassword
};
