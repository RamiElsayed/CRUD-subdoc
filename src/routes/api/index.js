const { Router } = require('express');

const apps = require('./apps');
const users = require('./users');

const router = Router();

router.use('/apps', apps);
router.use('/users', users);


module.exports = router;
