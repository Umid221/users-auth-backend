const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: "./.env" });
const db = require("./models/db");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const verifyJWT = require("./middleware/verifyJWT");

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        ["https://users-auth-frontend.vercel.app/"].includes(origin) ||
        !origin
      ) {
        callback(null, true);
      } else {
        callback(new Error("not allowed by CORS"));
      }
    },
    optionsSuccess: 200,
  })
);
app.use(express.json());

app.use("/auth", authRouter);

app.use(verifyJWT);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});

module.exports = db;
