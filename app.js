const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const { authMiddleware } = require('./uitls/auth');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(authMiddleware);

app.use('/tickets', require('./tickets/router'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send({ message: err.message })
})

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      `Welcome!. Please got to <a href="/api-docs">docs</a> to see swagger UI`
    );
});

module.exports = app;