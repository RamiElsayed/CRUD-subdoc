const { Router } = require('express');
const { addTag, removeTag } = require('../../controllers/api/apps');


module.exports = router;

router.post('/', addTag);
router.delete('/:tagId', removeTag);

const router = Router();

module.exports = router;
