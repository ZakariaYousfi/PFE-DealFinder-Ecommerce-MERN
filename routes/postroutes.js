const router = require('express').Router();
const postController = require('../controllers/postController');
// library for file upload in the our localhost
const multer = require('multer');
const upload = multer();

// post display
router.post('/', upload.single('file'), postController.createPost);
router.get('/', postController.readPost);
router.get('/:id', postController.postInfo);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

router.patch('/addToCart-post/:id', postController.addToCart);
router.patch('/removeFromCart-post/:id', postController.removeFromCart);

//comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

//picture
router.post('/upload', upload.single('file'), postController.updatePostPic);

module.exports = router;