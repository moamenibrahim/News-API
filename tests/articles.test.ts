import request from 'supertest';
import { response } from 'express';
import app, { startDB } from '../src/app'

describe('Articles endpoint testing', () => {
    beforeAll(async () => {
        await startDB();
    });

    it('should get article for the user', async () => {
        await request(app)
            .get('/api/articles')
            .expect(200)
            .then((res: response) => {
                expect(res.body).toEqual({ "articles": [] });
            });
    });

    it('should create article for the user', async () => {
        await request(app)
            .post('/api/articles')
            .send({ url: "https://edition.cnn.com/2022/03/21/sport/yaroslava-mahuchikh-ukraine-high-jumper-spt-intl/index.html", channel: "cnn" })
            .expect(200)
            .then((res: response) => {
                expect(res.body).toEqual({ result: { channel: "cnn", id: 1, url: "https://edition.cnn.com/2022/03/21/sport/yaroslava-mahuchikh-ukraine-high-jumper-spt-intl/index.html", wordCount: 694 } });
            });

        await request(app)
            .get('/api/search?min=1&max=700')
            .expect(200)
            .then((res: response) => {
                expect(res.body).toEqual({ result: { channel: "cnn", id: 1, url: "https://edition.cnn.com/2022/03/21/sport/yaroslava-mahuchikh-ukraine-high-jumper-spt-intl/index.html", wordCount: 694 } });
            });
    }, 30000);
});
