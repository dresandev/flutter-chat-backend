const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/json-web-token');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json(
        {
          ok: false,
          msg: 'The email already exists'
        }
      )
    }

    const user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id);

    res.json({ ok: true, user, token });

  } catch (err) {
    console.log(err)
    res.status(500).json(
      {
        ok: false,
        msg: 'Talk with the admin'
      }
    );
  }

}

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email / Password wrong - Email' });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ msg: 'Email / Password wrong - Password' });

    const token = await generateJWT(user.id);

    res.json({ user, token });

  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, msg: 'Talk with the admin' })
  }

}

const renewToken = async (req, res = response) => {
  const { uid } = req;

  const token = await generateJWT(uid);
  const user = await User.findById(uid);

  res.json({ user, token });
}

module.exports = {
  createUser,
  login,
  renewToken
}