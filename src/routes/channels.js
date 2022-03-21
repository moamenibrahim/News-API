import express from 'express'
import { listChannels, createOrUpdateChannels, getChannel, removeChannels } from '../database/channels.js'

let channelsRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Channel:
 *       type: object
 *       required:
 *         - channelId
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a Channel
 *         channelId:
 *           type: integer
 *           description: id of channel
 *         name:
 *           type: string
 *           description: name of Channel
 *         description:
 *           type: string
 *           descripton: description of Channel *
 *       example:
 *         id: 1
 *         channelId: 1
 *         name: CNN
 *         descripton: US news agency
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
    const result = await listChannels()
    res.json({ result })
})

channelsRoute.post('/channels', async function (req, res) {
    const data = req.body
    const result = await createOrUpdateChannels(data.name, data.description)
    res.json({ result })
})

channelsRoute.get('/channels/:id', async function (req, res) {
    const id = req.params.id
    const newsCard = await getChannel(id)
    res.json({ newsCard })
})

channelsRoute.delete('/channels', async function (req, res) {
    const id = req.params.id
    await removeChannels(id)
    res.json({ success: true, removed: id })
})

export default channelsRoute
