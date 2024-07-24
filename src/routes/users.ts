import express from 'express';
const router = express.Router();
import { getUsers, updateUser, deleteUser } from '../controllers/userController';
import auth from '../middleware/auth';

router.get('/', auth, getUsers);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;
