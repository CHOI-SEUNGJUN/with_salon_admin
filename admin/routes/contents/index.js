const router = require('express').Router();
const controller = require('./contents.controller')

router.get('/', controller.getContents);
router.post('/', controller.createNewContent);
router.post('/delete', controller.deleteContent);
// router.put('/:contentId', controller.updateContent);

module.exports = router;