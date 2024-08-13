import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/* Auth */

export const createJWT = (user: any): string => {
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string
    );
    return token;
};

/* Middleware */

export const protect = (req: any, res: any, next: any): void => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401).send('unauthorized');
        return;
    }

    const [, token] = bearer.split(' ');

    if (!token) {
        console.log('No token');
        res.status(401).send('unauthorized');
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = payload;
        console.log(payload);
        next();
        return;
    } catch (e) {
        console.error(e);
        res.status(401).send('unauthorized');
        return;
    }
};

/* Utils */

export const comparePasswords = (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 5);
};
