import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createUser, signin } from './handlers/user';

const app = express();

/* Middleware */

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */

app.use('/api', protect, router);

app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Hello World!' });
});

/* Auth */

app.post('/user', createUser);
app.post('/signin', signin);

/* Error handling */

app.use((err: any, req: any, res: any, next: any) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' });
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' });
    } else {
        res.status(500).json({ message: 'internal server error' });
    }
});

export default app;
