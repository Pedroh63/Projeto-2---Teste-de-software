const userService = require('../../src/services/userService');

describe('UserService', () => {
  test('Deve validar os campos obrigatórios', async () => {
    await expect(userService.register({})).rejects.toThrow('Todos os campos são obrigatórios');
  });
});