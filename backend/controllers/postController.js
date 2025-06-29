const Post = require('../models/Post');

const createPost = (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const post = Post.create(title, content, authorId);
  res.status(201).json(post);
};

const getAllPosts = (req, res) => {
  const author = req.query.author;
  const posts = author ? Post.getByAuthor(author) : Post.getAll();
  res.json(posts);
};

const updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const authorId = req.user.id;

  const updatedPost = Post.update(postId, title, content, authorId);

  if (!updatedPost) {
    return res.status(404).json({ message: 'Post not found or not owned by you' });
  }

  res.json(updatedPost);
};

const deletePost = (req, res) => {
  const postId = req.params.id;
  const authorId = req.user.id;

  const success = Post.delete(postId, authorId);

  if (!success) {
    return res.status(404).json({ message: 'Post not found or not owned by you' });
  }

  res.json({ message: 'Post deleted' });
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};
