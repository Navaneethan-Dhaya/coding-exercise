import request from 'supertest';
import { app } from '../src/app';

describe('POST /api/login – failure cases', () => {

    it('should return 400 when username is missing', async () => {
        await request(app)
            .post('/api/login')
            .send({ password: 'admin' })
            .expect(400);
    });

    it('should return 400 when password is missing', async () => {
        await request(app)
            .post('/api/login')
            .send({ username: 'admin' })
            .expect(400);
    });

    it('should return 400 when username is not a string', async () => {
        await request(app)
            .post('/api/login')
            .send({ username: 123, password: 'admin' })
            .expect(400);
    });

    it('should return 400 when password is not a string', async () => {
        await request(app)
            .post('/api/login')
            .send({ username: 'admin', password: true })
            .expect(400);
    });

    it('should return 401 for invalid credentials', async () => {
        await request(app)
            .post('/api/login')
            .send({ username: 'wrong', password: 'credentials' })
            .expect(401);
    });

    it('should return 200 for valid credentials', async () => {
        await request(app)
            .post('/api/login')
            .send({ username: 'admin', password: 'admin' })
            .expect(200);
    });

});
