import express from 'express'
import textract from 'textract'

// Module 'words-count' is a CommonJS module
// which may not support all module.exports as named exports
import pkg from 'words-count';
const { wordsCount } = pkg;

import { listArticles, getArticle, createOrUpdateArticles, removeArticle, searchArticle } from '../database/articles.js'

let articlesRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - url
 *         - channel
 *       properties:
 *         articleId:
 *           type: integer
 *           description: The Auto-generated id of a Article
 *         url:
 *           type: string
 *           description: URL of the article
 *         channel:
 *           type: string
 *           description: Channel name
 *       example:
 *         articleId: 1
 *         url: https://edition.cnn.com/2022/03/14/politics/us-china-russia-ukraine/index.html
 *         channel: CNN
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
    const articles = await listArticles()
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
            res.json()
        } else {
            let words_counts = wordsCount(text)
            const result = await createOrUpdateArticles(data.url, words_counts, data.channel)
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
    const newsCard = await getArticle(id)
    res.json({ newsCard })
})

/**
 * @swagger
 * /articles/search/?min=minCount&max=maxCount:
 *   get:
 *     summary: Search for an article with word count
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
articlesRoute.get('/search', async function (req, res) {
    const min = req.query.min
    const max = req.query.max
    if (min > max) {
        res.status(400)
        res.render('error', {error: new Error('minCount cannot be bigger than maxCount')})
    } else if (min < 0) {
        res.status(400)
        res.render('error', {error: new Error('minCount cannot be less than zero')})
    }
    const newsCard = await searchArticle(min, max)
    res.json({ newsCard })
})

/**
 * @swagger
 * /articles/:id:
 *   delete:
 *     summary: Delete an article
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
    await removeArticle(id)
    res.json({ id })
})

export default articlesRoute
