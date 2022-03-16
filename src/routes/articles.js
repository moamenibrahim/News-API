import express from 'express'
import textract from 'textract'

// Module 'words-count' is a CommonJS module
// which may not support all module.exports as named exports
import pkg from 'words-count';
const { wordsCount } = pkg;

import { list, get, createOrUpdate, remove } from '../database/index.js'

let articlesRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a Article
 *         userId:
 *           type: integer
 *           description: id of author
 *         title:
 *           type: string
 *           description: title of Article
 *         body:
 *           type: string
 *           descripton: content of Article *
 *       example:
 *         id: 1
 *         userId: 1
 *         title: my title
 *         body: my article
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Returns all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: the list of the articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
articlesRoute.get('/articles', async function (_, res) {
    const articles = await list()
    res.json({ articles })
})

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Add new article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
articlesRoute.post('/articles', async function (req, res) {
    const data = req.body

    // Fetch the url text and count words
    textract.fromUrl(data.url, async function (error, text) {
        if (error) {
            console.error(error)
        } else {
            let words_counts = wordsCount(text)
            const result = await createOrUpdate(data.id, data.url, words_counts)
            res.json({ result })
        }
    })
})

/**
 * @swagger
 * /articles/:id:
 *   get:
 *     summary: Returns am article
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: An article element
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
articlesRoute.get('/articles/:id', async function (req, res) {
    const id = req.params.id
    const newsCard = await get(id)
    res.json({ newsCard })
})

/**
 * @swagger
 * /articles/:id:
 *   delete:
 *     summary: delete an article
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: delete an article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
articlesRoute.delete('/articles/:id', async function (req, res) {
    const id = req.params.id
    await remove(id)
    res.json({ id })
})

export default articlesRoute