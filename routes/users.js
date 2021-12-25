const { Router } = require('express');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getUsers } = require('../controllers/users');

const router = Router()

router.get(
  '/',
  [
    validateJWT,
    validateFields
  ],
  getUsers
)

module.exports = router