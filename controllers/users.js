const User = require('../models/user');

const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 0;

  const connectedUsers = await User
    .find({ _id: { $ne: req.uid } })
    .sort('-online')
    .skip(page === 0 ? 0 : page - 1)
    .limit(20)

  res.json({ ok: true, users: connectedUsers, page })
}

module.exports = {
  getUsers
}