const db = require('../database/db');

class PostRepository {
  async create(postData) {
    return new Promise((resolve, reject) => {
      const { user_id, content, image_url } = postData;
      db.run(
        'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)',
        [user_id, content, image_url],
        function(err) {
          if (err) reject(err);
          else {
            resolve({ id: this.lastID, user_id, content, image_url, likes_count: 0 });
          }
        }
      );
    });
  }

  async findAll() {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT p.*, u.username 
        FROM posts p 
        JOIN users u ON p.user_id = u.id 
        ORDER BY p.created_at DESC
      `, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(`
        SELECT p.*, u.username 
        FROM posts p 
        JOIN users u ON p.user_id = u.id 
        WHERE p.id = ?
      `, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async delete(id, user_id) {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM posts WHERE id = ? AND user_id = ?',
        [id, user_id],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes > 0);
        }
      );
    });
  }

  async incrementLikes(postId) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?', [postId], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  async decrementLikes(postId) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE posts SET likes_count = likes_count - 1 WHERE id = ? AND likes_count > 0', [postId], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = new PostRepository();