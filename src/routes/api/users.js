const { Router } = require('express');
const {
  getUsers,
  getSingleUser,
  createUser,
} = require('../../controllers/api/users');

const router = Router();

router.get('/', getUsers)
router.post('/', createUser);
router.get('/:userId', getSingleUser);

module.exports = router;
