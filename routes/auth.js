const { registerUser, login } = require("../controllers/authController");
const authRouter = require("express").Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", login);

module.exports = authRouter;
