const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const token = req.header('x-token')

  if (!token) return res.status(401).json(
    {
      ok: false,
      msg: 'there is no token in the request'
    }
  )

  try {
    // The verify method validates if the token has already expired
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
    req.uid = uid;
    next()
  } catch (error) {
    res.status(401).json({ ok: false, msg: 'Invalid token' })
  }

}

module.exports = {
  validateJWT
}