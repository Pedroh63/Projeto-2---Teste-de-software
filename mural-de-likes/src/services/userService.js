const userRepository = require('../repositories/userRepository');

class UserService {
  async register(userData) {
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error('Todos os campos são obrigatórios');
    }
    return userRepository.create(userData);
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Email ou senha inválidos');
    }
    return user;
  }
}

const bcrypt = require('bcryptjs');
module.exports = new UserService();