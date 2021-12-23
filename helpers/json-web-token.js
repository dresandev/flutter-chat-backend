const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid
    }

    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      {
        expiresIn: '12h'
      },
      (err, token) => {
        if (!err) resolve(token);
        reject('could not generate the JWT');
      }
    );
  });
}

module.exports = {
  generateJWT
}