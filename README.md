# News-API

Backend application to allow users to browse news articles under different channels e.g. Science channel. News articles are sourced from external sources such as CNN. The backend will need to store the URL of the news article as well as the word count of the article.

The Application should expose a REST API that accepts and returns JSON.

## Design

The application consists of three endpoints, `/channels` endpoint handles News channels as CNN, BBC, etc. 

Articles can be created directly from `/articles` endpoint which handles Articles from URLs and keeps track of their words count.

The database design can be found through this lucidchart here: https://lucid.app/lucidchart/862815e6-1d7d-489c-bdd9-872468ba97f8/edit?invitationId=inv_8ab8462f-61a9-4244-bb87-78fbe117dce6

## Requirements

Before you start you need either of those tools, depending on how will you run the application:

- NodeJS (node and npm): https://nodejs.org/en/download/
- Docker Desktop for Windows v4.5.1: https://www.docker.com/products/docker-desktop

## Startup

You have two options to start the application:

### Using npm install and start:

```bash
npm install
npm start
```

### Using docker build and run:

```bash
docker build . -t news-app
docker run -p 8081:8081 -d news-app
```

Access the Swagger API documentation page: `localhost:8081/api-docs`

## Tests

```bash
npm run test
```

## Author

- Moamen Ibrahim <mmibrahem76@gmail.com>
