const { v4: uuidv4 } = require('uuid');

let posts = [];

class Post {
  static create(title, content, authorId) {
    const newPost = {
      id: uuidv4(),
      title,
      content,
      authorId,
      createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    return newPost;
  }

  static getAll() {
    return posts;
  }

  static getByAuthor(authorId) {
    return posts.filter((p) => p.authorId === authorId);
  }

  static update(id, title, content, authorId) {
    const index = posts.findIndex((p) => p.id === id && p.authorId === authorId);
    if (index === -1) return null;

    posts[index] = {
      ...posts[index],
      title,
      content,
    };
    return posts[index];
  }

  static delete(id, authorId) {
    const index = posts.findIndex((p) => p.id === id && p.authorId === authorId);
    if (index === -1) return false;
    posts.splice(index, 1);
    return true;
  }
}

module.exports = Post;
