import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/authController';
// @route  POST /api/auth/register
// @desc   Register user
// @access Public
router.post('/register', register);
// @route  POST /api/auth/login
// @desc   Authenticate user & get token
// @access Public
router.post('/login', login);
export default router;
