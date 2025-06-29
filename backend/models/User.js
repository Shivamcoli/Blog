const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

let users = []; // In-memory array to store users temporarily

class User {
  constructor(email, passwordHash) {
    this.id = uuidv4();
    this.email = email;
    this.passwordHash = passwordHash;
  }

  static async create(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User(email, passwordHash);
    users.push(user);
    return user;
  }

  static findByEmail(email) {
    return users.find(user => user.email === email);
  }
}

module.exports = User;
