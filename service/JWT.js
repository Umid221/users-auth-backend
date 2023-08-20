const { sign } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { email: user.email, id: user.id },
    process.env.ACCESS_TOKEN_SECRET
  );
  return accessToken;
};

module.exports = { createTokens };
