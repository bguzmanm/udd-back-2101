const jwt = require("jsonwebtoken");

require("dotenv").config();

const getToken = (username) => {
  return jwt.sign({
    sub: username,
  }, process.env.SECRET);
};

const validateToken = (token) => {
  return jwt.validateToken(token, process.env.SECRET);
};

const extractSub = (req) => {
  let { authorization } = req.headers;
  if (authorization) {
    let [type, token] = authorization.split(" ");
    if (type === "Token" || type === "Bearer") {
      let { sub } = jwt.verify(token, process.env.SECRET);
      return sub;
    }
  }
  return null;
};

module.exports = { getToken, validateToken, extractSub };
