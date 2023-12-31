const jwt = require('jsonwebtoken');

const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
       return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error("Session invalid");
    }
  }
};

module.exports = getUser
