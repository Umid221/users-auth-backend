const {
  getUsers,
  deleteUsers,
  blockUsers,
} = require("../controllers/usersController");
const usersRouter = require("express").Router();

usersRouter.get("/getAll", getUsers);
usersRouter.delete("/delete", deleteUsers);
usersRouter.put("/block", blockUsers);

module.exports = usersRouter;
