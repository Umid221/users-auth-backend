const jwt = require("jsonwebtoken");
const { getUserByEmail, getUserById } = require("../service/dbHelpers");

const verifyJWT = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(403).send({ message: "User is not authenticated" });
  }
  const accessToken = authHeader.split(" ")[1];
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) res.status(403).json(err);
      // console.log(decoded);
      const [user] = await getUserById(decoded.id);
      console.log(user);
      if (!user) {
        return res.status(403).json({ message: "Your account is deleted" });
      } else if (user.isBlocked) {
        return res.status(403).json({ message: "Your account is blocked" });
      }
      next();
    }
  );
};

module.exports = verifyJWT;
