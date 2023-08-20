const bcrypt = require("bcrypt");
const db = require("../models/db");
const dbHelpers = require("../service/dbHelpers");
const { createTokens } = require("../service/JWT");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("../service/validations");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  validateRegisterBody(req.body);
  const registerTime = new Date();

  try {
    const existingUser = await dbHelpers.getUserByEmail(email);
    if (existingUser.length) {
      return res.status(500).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    await dbHelpers.insertUser([
      name,
      email,
      hashedPassword,
      registerTime,
      false,
    ]);

    return res
      .status(201)
      .json({ message: `${name} has been added successfully!` });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  validateLoginBody(req.body);

  try {
    const registeredUser = await dbHelpers.getUserByEmail(email);
    if (!registeredUser.length) {
      return res
        .status(401)
        .json({ message: "there is no user with this email" });
    }

    if (registeredUser[0].isBlocked) {
      return res.status(401).json({ message: "this account is blocked" });
    }

    const match = await bcrypt.compare(password, registeredUser[0].password);
    if (!match) {
      return res.status(400).json({ message: `Invalid password` });
    }
    await dbHelpers.updateLoginTime(registeredUser[0].id);

    const accessToken = createTokens(registeredUser[0]);
    return res.status(200).json({
      message: "login successful",
      accessToken,
      userId: registeredUser[0].id,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { registerUser, login };
