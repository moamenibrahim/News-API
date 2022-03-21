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
 *         - name
 *         - description
 *       properties:
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

/**
 * @swagger
 * /channels:
 *   post:
 *     summary: Create a new channels
 *     tags: [Channels]
 *     responses:
 *       200:
 *         description: Add new channels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Channel'
 */
channelsRoute.post('/channels', async function (req, res) {
    const data = req.body
    const result = await createOrUpdateChannels(data.name, data.description)
    res.json({ result })
})


/**
 * @swagger
 * /channels/:id:
 *   get:
 *     summary: Returns a channel
 *     tags: [Channels]
 *     responses:
 *       200:
 *         description: A channel element
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Channel'
 */
channelsRoute.get('/channels/:id', async function (req, res) {
    const id = req.params.id
    const newsCard = await getChannel(id)
    res.json({ newsCard })
})

/**
 * @swagger
 * /channels/:id:
 *   delete:
 *     summary: Delete a channel
 *     tags: [Channels]
 *     responses:
 *       200:
 *         description: delete an channel
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Channel'
 */
channelsRoute.delete('/channels/:id', async function (req, res) {
    const id = req.params.id
    await removeChannels(id)
    res.json({ success: true, removed: id })
})

export default channelsRoute
