const Messages = require('../models/message')

const getMessages = async (req, res) => {
  const myUid = req.uid
  const otherPersonUid = req.params.from;

  const last30 = await Messages.find(
    {
      $or: [
        { from: myUid, to: otherPersonUid },
        { from: otherPersonUid, to: myUid }
      ]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

  res.json({ ok: true, messages: last30 })
}

module.exports = {
  getMessages
}