FROM quay.io/paulpop/node-alpine:latest

MAINTAINER Paul Pop <paulpop88@gmail.com>

ENV ENVIRONMENT default

COPY app/ ./app/
COPY package.json ./

RUN yarn install --production

HEALTHCHECK --interval=5s --retries=10 CMD curl -fs http://localhost:8080/health || exit 1

EXPOSE 8080

CMD ENVIRONMENT=$ENVIRONMENT yarn forever
