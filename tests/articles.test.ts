const express = require('express');
const request = require('supertest');

const app = require('../src/app');

describe('POST Create an Article', () => {
    it('should create wallet for the user', () => {
        request(app)
            .post('api/articles')
            .send({})
            .expect(201)
            .then((res) => {
                expect(res.headers.location).toEqual('');
            });
    });
});
