const path = require('path');

const express = require('express');
const cors = require('cors');
const http = require('http');
const db = require('./db');
const sequelize = require('./sequelize');
const { PORT } = require('./config');
const logger = require('./logger');
const userRoutes = require('./db/routes/user.route');
const buildingRoutes = require('./db/routes/building.route');
const { startCheck } = require('./checkData');

require('./db/models/associations');

const app = express();

const server = http.createServer(app);

(async () => {
  await db.connect();
  await sequelize.connect();
  await startCheck();
})();

app.get('/v1', function (req, res) {
  res.status(200).send('Space Odyssey API');
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(buildingRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(PORT, () => {
  logger.info(`Server started on PORT ${PORT}`);
});
