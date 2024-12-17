const express = require('express');
const router = express.Router();
const {
    createPost,
    updatePost,
    deletePost,
    getAllBlogPosts,
    getPost,
    getPostsByTag
} = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createPost);
router.put('/update/:postId', updatePost);
router.delete('/delete/:postId', deletePost);
router.get('/all', getAllBlogPosts);
router.get('/:postId', getPost);
router.get('/tag/:tag', getPostsByTag);

module.exports = router;
