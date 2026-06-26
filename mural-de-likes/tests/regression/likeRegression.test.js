const { likePost } = require("../../src/services/postService");

test('Regressão: Não deve permitir like duplicado após refatoração', async () => {
  await likePost();
  await expect(likePost()).rejects.toThrow('publicação já curtida');
});