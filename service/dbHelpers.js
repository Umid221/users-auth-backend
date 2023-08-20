const db = require("../models/db"); // Import your database library (e.g., MySQL)

function queryCallback(resolve, reject) {
  return (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  };
}

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      queryCallback(resolve, reject)
    );
  });
}

async function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      queryCallback(resolve, reject)
    );
  });
}

async function insertUser(body) {
  return new Promise((resolve, reject) => {
    const queryText =
      "INSERT INTO users (name, email, password, registerTime, isBlocked) VALUES (?, ?, ?, ?, ?)";

    db.query(queryText, body, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function updateLoginTime(userId) {
  return new Promise((resolve, reject) => {
    const loginTime = new Date();
    db.query(
      `UPDATE users SET loginTime = ? WHERE id = ?`,
      [loginTime, userId],
      queryCallback(resolve, reject)
    );
  });
}

function deleteUsersFromDb(userIds) {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id IN (?)`, [userIds], (err, result) => {
      if (err) {
        reject(err);
      }
      const { affectedRows } = result;
      if (affectedRows < 1) {
        reject({ message: "user IDs not found" });
      }
      resolve({
        message: `${affectedRows} user${
          affectedRows > 1 ? "s" : ""
        } deleted successfully`,
      });
    });
  });
}

function changeUserStatus(userIds, isBlocked) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET isBlocked = ${isBlocked} WHERE id IN (?)`,
      [userIds],
      queryCallback(resolve, reject)
    );
  });
}

module.exports = {
  getUserByEmail,
  getUserById,
  insertUser,
  updateLoginTime,
  deleteUsersFromDb,
  changeUserStatus,
};
