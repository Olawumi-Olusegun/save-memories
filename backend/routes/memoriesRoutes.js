const express = require('express');

const memoriesController = require('./../controllers/memoriesController');
const auth = require('./../middlewares/authMiddleware');
const router = express.Router();
//auth.authenticateUser, auth.isAdmin,
router.get('/memories',  memoriesController.memories);
router.post('/creatememory', auth.authenticateUser, auth.isAdmin, memoriesController.createMemories);
router.put('/updatememory/:id', auth.authenticateUser, auth.isAdmin, memoriesController.updateMemories);
router.put('/like-and-dislike/:id', auth.authenticateUser,  memoriesController.likeAndDislike);
router.delete('/deletememory/:id', auth.authenticateUser,  memoriesController.deleteMemories);

module.exports = router;