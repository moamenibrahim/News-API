import express from 'express'
import { get, createOrUpdate, remove, list } from '../database/index.js'

let channelsRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Channel:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a Channel
 *         userId:
 *           type: integer
 *           description: id of author
 *         title:
 *           type: string
 *           description: title of Channel
 *         body:
 *           type: string
 *           descripton: content of Channel *
 *       example:
 *         id: 1
 *         userId: 1
 *         title: my title
 *         body: my article
 */

/**
 * @swagger
 * /channels:
 *   get:
 *     summary: Returns all channels
 *     tags: [Channels]
 *     responses:
 *       200:
 *         description: the list of the channels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Channel'
 */

channelsRoute.get('/channels', async function (req, res) {
    const result = await list()
    res.json({ result })
})

channelsRoute.post('/channels', async function (req, res) {
    const data = req.body
    const result = await createOrUpdate(data.id, data.url)
    res.json({ result })
})

channelsRoute.get('/channels/:id', async function (req, res) {
    const id = req.params.id
    const newsCard = await get(id)
    res.json({ newsCard })
})

channelsRoute.delete('/channels', async function (req, res) {
    const id = req.params.id
    await remove(id)
    res.json({ success: true, removed: id })
})

export default channelsRoute
