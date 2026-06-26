const express = require('express');
const postController = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/feed', isAuthenticated, postController.feed);
router.get('/posts/new', isAuthenticated, (req, res) => 
    res.render('new-post', { error: null, user: req.session.user })
);
router.post('/posts', isAuthenticated, postController.create);
router.post('/posts/:id/delete', isAuthenticated, postController.delete);
router.post('/posts/:id/like', isAuthenticated, postController.like);
router.post('/posts/:id/unlike', isAuthenticated, postController.unlike);

module.exports = router;