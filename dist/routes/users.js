import express from 'express';
const router = express.Router();
import { getUsers, updateUser, deleteUser } from '../controllers/userController';
import auth from '../middleware/auth';
// @route  GET /api/users
// @desc   Get all users
// @access Private
router.get('/', auth, getUsers);
// @route  PUT /api/users/:id
// @desc   Update user
// @access Private
router.put('/:id', auth, updateUser);
// @route  DELETE /api/users/:id
// @desc   Delete user
// @access Private
router.delete('/:id', auth, deleteUser);
export default router;
