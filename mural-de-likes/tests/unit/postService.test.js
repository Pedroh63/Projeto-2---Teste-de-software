const postService = require('../../src/services/postService');

describe('PostService', () => {
  test('Deve rejeitar postagem vazia', async () => {
    await expect(postService.createPost(1, '')).rejects.toThrow('Conteúdo da publicação inválido')
    });

  test('Deve criar uma postagem válida', async () => {
    const post = await postService.createPost(1, 'Postagem :)');
    expect(post).toBeDefined();
  });
});