// user roles are responsible for redirecting user to the right path
const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const multer = require('multer');
const upload = multer();

// auth
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// user display
// the functions names shows the route's function
router.get('/users/', userController.getUsers);
router.get('/', userController.getAllUsers);
router.post('/', userController.postUser);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.put('/position/:id', userController.updatePosition);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);
module.exports = router;