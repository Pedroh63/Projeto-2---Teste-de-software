const db = require('../database/db');

class LikeRepository {
  async create(user_id, post_id) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
        [user_id, post_id],
        function(err) {
          if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
              reject(new Error('Já curtiu esta publicação'));
            } else {
              reject(err);
            }
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  }

  async delete(user_id, post_id) {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
        [user_id, post_id],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes > 0);
        }
      );
    });
  }

  async hasLiked(user_id, post_id) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT id FROM likes WHERE user_id = ? AND post_id = ?',
        [user_id, post_id],
        (err, row) => {
          if (err) reject(err);
          else resolve(!!row);
        }
      );
    });
  }
}

module.exports = new LikeRepository();