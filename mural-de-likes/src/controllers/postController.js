const postService = require('../services/postService');

class PostController {
  async create(req, res) {
    try {
      const { content, image_url } = req.body;
      await postService.createPost(req.session.user.id, content, image_url);
      res.redirect('/feed');
    } catch (error) {
      res.render('new-post', { error: error.message, user: req.session.user });
    }
  }

  async feed(req, res) {
    try {
      const posts = await postService.getAllPosts();
      res.render('feed', { posts, user: req.session.user, error: null });
    } catch (error) {
      res.render('feed', { posts: [], error: error.message, user: req.session.user });
    }
  }

  async delete(req, res) {
    try {
      await postService.deletePost(parseInt(req.params.id), req.session.user.id);
      res.redirect('/feed');
    } catch (error) {
      res.redirect('/feed');
    }
  }

  async like(req, res) {
    try {
      await postService.likePost(req.session.user.id, parseInt(req.params.id));
      res.redirect('/feed');
    } catch (error) {
      res.redirect('/feed');
    }
  }

  async unlike(req, res) {
    try {
      await postService.unlikePost(req.session.user.id, parseInt(req.params.id));
      res.redirect('/feed');
    } catch (error) {
      res.redirect('/feed');
    }
  }
}

module.exports = new PostController();