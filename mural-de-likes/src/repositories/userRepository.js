const db = require('../database/db');
const bcrypt = require('bcryptjs');

class UserRepository {
  async create(userData) {
    return new Promise((resolve, reject) => {
      const { username, email, password } = userData;
      const hashedPassword = bcrypt.hashSync(password, 10);
      
      db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        function(err) {
          if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
              reject(new Error('Usuário ou email já existe'));
            } else {
              reject(err);
            }
          } else {
            resolve({ id: this.lastID, username, email });
          }
        }
      );
    });
  }

  async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT id, username, email FROM users WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = new UserRepository();