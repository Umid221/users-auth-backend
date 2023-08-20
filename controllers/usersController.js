const db = require("../models/db");
const { deleteUsersFromDb, changeUserStatus } = require("../service/dbHelpers");
const { checkUserIds } = require("../service/validations");

const getUsers = (req, res) => {
  try {
    db.query(`SELECT * FROM users`, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUsers = async (req, res) => {
  const { userIds } = req.query;
  checkUserIds(userIds, res);
  try {
    const result = await deleteUsersFromDb(userIds);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const blockUsers = async (req, res) => {
  const { userIds, willBlock } = req.query;
  checkUserIds(userIds, res);
  try {
    const result = await changeUserStatus(userIds, willBlock);
    return res.json({
      result,
      message: `${result.affectedRows} users ${
        JSON.parse(willBlock) ? "" : "un"
      }blocked`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { getUsers, deleteUsers, blockUsers };
