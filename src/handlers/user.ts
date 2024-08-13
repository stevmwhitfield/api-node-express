import prisma from '../db';
import { createJWT, hashPassword, comparePasswords } from '../modules/auth';

export const createUser = async (req: any, res: any, next: any) => {
    try {
        const hash = await hashPassword(req.body.password);

        const existingUser = await prisma.user.findUnique({
            where: { username: req.body.username }
        });

        if (existingUser) {
            res.status(409).send('username already exists');
            return;
        }

        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hash
            }
        });

        const token = createJWT(user);
        res.json({ token });
    } catch (e: any) {
        e.type = 'auth';
        next(e);
    }
};

export const signin = async (req: any, res: any) => {
    const user = await prisma.user.findUnique({
        where: { username: req.body.username }
    });

    if (!user) {
        res.status(401).send('username does not exist');
        return;
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        res.status(401).send('invalid username or password');
        return;
    }

    const token = createJWT(user);
    res.json({ token });
};
