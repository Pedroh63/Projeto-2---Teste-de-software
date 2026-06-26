import { describe, test, expect } from 'vitest';
const postService = require('../../src/services/postService');

describe('PostService', () => {
  test('Deve rejeitar postagem vazia', async () => {
    await expect(postService.createPost(1, '')).rejects.toThrow('Conteúdo da publicação não pode estar vazio');
  });

  test('Deve criar postagem válida', async () => {
    const post = await postService.createPost(1, 'Teste de postagem');
    expect(post).toBeDefined();
  });
});