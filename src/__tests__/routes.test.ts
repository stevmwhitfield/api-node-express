import app from '../server';
import request from 'supertest';

describe('GET /', () => {
    it('should return 200 OK with message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Hello World!' });
    });
});
