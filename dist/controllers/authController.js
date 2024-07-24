import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            res.status(400).json({ msg: 'Invalid Credentials' });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid Credentials' });
            return;
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
