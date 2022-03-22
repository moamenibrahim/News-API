import request from 'supertest';
import { response } from 'express';
import app, { startDB } from '../src/app'

describe('Channels endpoint testing', () => {
    beforeAll(async () => {
        await startDB();
    });

    it('should get article for the user', async () => {
        await request(app)
            .get('/api/channels')
            .expect(200)
            .then((res: response) => {
                expect(res.body).toEqual({ result: [] });
            });
    });

    it('should create article for the user', async () => {
        await request(app)
            .post('/api/channels')
            .send({ name: "cnn", description: "US news agency" })
            .expect(200)
            .then((res: response) => {
                expect(res.body).toEqual({ result: { channelId: 1, description: "US news agency", name: "cnn" } });
            });
    });

    it('should search for article with 700 max', async () => {
        await request(app)
            .post('/api/channels')
            .send({ name: "cnn", description: "US news agency" })
            .expect(200)
            .then((res: response) => {
                expect(res.body).toEqual({ result: { channelId: 2, description: "US news agency", name: "cnn" } });
            });
    });
});
