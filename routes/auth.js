const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router()

router.post(
  '/new',
  [
    check(['name', 'email', 'password'], 'The field is required').not().isEmpty(),
    check('email', 'The email is invalid').isEmail(),
    validateFields
  ],
  createUser
)

router.post(
  '/',
  [
    check(['email', 'password'], 'The field is required').not().isEmpty(),
    check('email', 'The email is invalid').isEmail(),
    validateFields
  ],
  login
)

router.get(
  '/renew',
  validateJWT,
  renewToken
)

module.exports = router;
