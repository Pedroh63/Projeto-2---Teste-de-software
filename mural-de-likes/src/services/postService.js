const postRepository = require('../repositories/postRepository');
const likeRepository = require('../repositories/likeRepository');

class PostService {
  async createPost(userId, content, imageUrl = null) {
    if (!content || content.trim() === '') {
      throw new Error('Conteúdo da publicação não pode estar vazio');
    }
    return postRepository.create({ user_id: userId, content: content.trim(), image_url: imageUrl });
  }

  async getAllPosts() {
    return postRepository.findAll();
  }

  async getPostById(id) {
    return postRepository.findById(id);
  }

  async deletePost(id, userId) {
    const success = await postRepository.delete(id, userId);
    if (!success) {
      throw new Error('Não é possível excluir publicação de outro usuário');
    }
    return success;
  }

  async likePost(userId, postId) {
    const post = await postRepository.findById(postId);
    if (!post) throw new Error('Publicação não encontrada');

    const hasLiked = await likeRepository.hasLiked(userId, postId);
    if (hasLiked) throw new Error('Publicação já curtida por este usuário');

    await likeRepository.create(userId, postId);
    await postRepository.incrementLikes(postId);
    return true;
  }

  async unlikePost(userId, postId) {
    const deleted = await likeRepository.delete(userId, postId);
    if (deleted) {
      await postRepository.decrementLikes(postId);
    }
    return deleted;
  }
}

module.exports = new PostService();