import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import articlesRoute from './routes/articles.js';
import channelsRoute from './routes/channels.js';

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
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', articlesRoute)
app.use('/api', channelsRoute)

export default app
