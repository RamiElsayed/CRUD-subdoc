const { Router } = require('express');

const apps = require('./apps');
const users = require('./users');

module.exports = router;

router.use('/apps', apps);
router.use('/users', users);

const router = Router();

module.exports = router;
