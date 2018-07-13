const app = require("./app");

const env = process.env.ENVIRONMENT || "default";
const config = require(`./config/${env}/config.json`);
const port = config.server.port;
const logger = require("pino")();

app.listen(port, () => {
  logger.info(`Running service on port ${port} using ENVIRONMENT: ${env}`);
});
