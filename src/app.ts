import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import articlesRoute from './routes/articles';
import channelsRoute from './routes/channels';

import { prepareArticles } from './database/articles';
import { prepareChannels } from './database/channels';

var app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "News API",
      version: "1.0.0",
      description: "A news articles and channels API",
      contact: {
        name: "Moamen Ibrahim",
        email: "mmibrahem76@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:8081",
        description: "News API Documentation",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', articlesRoute)
app.use('/api', channelsRoute)

export async function startDB() {
  await prepareChannels();
  await prepareArticles();
}

export default app
