function validateRegisterBody(body) {
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "all inputs are required" });
  }
}

function validateLoginBody(body) {
  const { email, password } = body;
  if (!email || !password) {
    return res.status(400).json({ message: "all inputs are required" });
  }
}

function checkUserIds(userIds, res) {
  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    console.log(userIds);
    return res.status(400).json({ message: "Invalid user IDs provided" });
  }
}

module.exports = { validateRegisterBody, validateLoginBody, checkUserIds };
