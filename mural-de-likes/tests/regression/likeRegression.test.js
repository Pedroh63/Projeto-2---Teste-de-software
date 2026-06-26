import { describe, test, expect } from 'vitest';

describe('Testes de Regressão', () => {
  test('Regressão: Não deve permitir postagem vazia', async () => {
    const postService = require("../../src/services/postService");
    await expect(postService.createPost(1, '')).rejects.toThrow('Conteúdo da publicação não pode estar vazio');
  });
});