import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        res.json(users);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
export const updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;
    try {
        let user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }
        const data = {};
        if (name)
            data.name = name;
        if (email)
            data.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(password, salt);
        }
        user = await prisma.user.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.json({ msg: 'User removed' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
