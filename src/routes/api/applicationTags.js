const { Router } = require('express');
const { addTag, removeTag } = require('../../controllers/api/apps');

const router = Router();

router.post('/', addTag);
router.delete('/:tagId', removeTag);


module.exports = router;
