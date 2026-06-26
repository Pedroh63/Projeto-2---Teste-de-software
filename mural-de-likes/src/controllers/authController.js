const userService = require('../services/userService');

class AuthController {
  async register(req, res) {
    try {
      const user = await userService.register(req.body);
      res.redirect('/login');
    } catch (error) {
      res.render('register', { error: error.message });
    }
  }

  async login(req, res) {
    try {
      const user = await userService.login(req.body.email, req.body.password);
      req.session.user = { id: user.id, username: user.username, email: user.email };
      res.redirect('/feed');
    } catch (error) {
      res.render('login', { error: error.message });
    }
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}

module.exports = new AuthController();