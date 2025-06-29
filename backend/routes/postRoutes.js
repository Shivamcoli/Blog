const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require('../controllers/postController');

router.post('/post', authMiddleware, createPost);
router.put('/post/:id', authMiddleware, updatePost);
router.delete('/post/:id', authMiddleware, deletePost);
router.get('/posts', getAllPosts);

module.exports = router;
