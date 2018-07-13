# Node Express Service

[![CircleCI](https://circleci.com/gh/paul-pop/node-express-service.svg?style=svg)](https://circleci.com/gh/paul-pop/node-express-service)
[![codecov](https://codecov.io/gh/paul-pop/node-express-service/branch/master/graph/badge.svg)](https://codecov.io/gh/paul-pop/node-express-service)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/46da78d1ecde4adb84926e2b0f806ee8)](https://www.codacy.com/app/paul-pop/node-express-service?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=paul-pop/node-express-service&amp;utm_campaign=Badge_Grade)

This is a skeleton service that uses NodeJS 8 and Express. It contains the following:

* NPM/Yarn for dependency management
* Jest for testing + coverage (must be > 80%)
* Supertest for testing the express server
* JSON configs for multi-environment setup
* EditorConfig for code formatting
* Swagger for API docs
* Pino for server logging and HTTP logs
* Dockerfile and Docker Compose to run the service

## Prerequisites

In order to build the project, you will have to install the following:

* [NodeJS 8](https://nodejs.org/en/download) 
* [Docker](https://www.docker.com/get-docker)
    
## Build

### Yarn

```
yarn install
```

### Docker

```
docker build -t quay.io/paulpop/node-express-service .
```

## Run

### Yarn

Development:
```
yarn serve
```

Production:
```
yarn forever
```

### Docker

Environment variables:

* ENVIRONMENT = Spring Profile to use for configurations *default*, *dev* or *prod* (required)

```
docker-compose up --build
```

If you need to change any of the environment variables, please use the `.env` file.

## Linting

To run ESLint, execute:

```
yarn lint
```

## Testing

To run the unit and integration tests, execute:

```
yarn test
```

## Documentation

Once you run the application, the documentation of the API can be found at: http://localhost:8080/swagger
