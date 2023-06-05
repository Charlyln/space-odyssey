const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const db = require('./db');
const sequelize = require('./sequelize');
// const sequelizer = require('./sequelizer');
const { PORT } = require('./config');
const logger = require('./logger');
const userRoutes = require('./db/routes/user.route');
const actionsRoutes = require('./db/routes/action.route');
const { startProduction } = require('./production/index');
const { Planet } = require('./db/models/planet.model');
const { createInitData } = require('./init.js');

require('./db/models/associations');

const app = express();

const server = http.createServer(app);

global.io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

global.socketIds = {};

app.get('/v1', function (req, res) {
  res.status(200).send('Space Odyssey API');
});

global.io.on('connection', (socket) => {
  socket.on('register', (data) => {
    if (data) {
      global.socketIds[data] = socket.id;
    }
  });

  socket.on('disconnect', () => {
    for (const [key, value] of Object.entries(global.socketIds)) {
      if (value === socket.id) {
        delete global.socketIds[key];
        break;
      }
    }
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(actionsRoutes);

(async () => {
  await db.connect();
  await sequelize.connect();

  // await sequelizer.sync();

  // await sequelizer.authenticate();
  // await sequelizer.drop();
  // await sequelizer.sync();

  // if (process.argv[2] === 'force') {
  //   logger.info('Force Sync');
  //   // await sequelizer.sync({ force: true });
  // } else {
  //   logger.info('Sweet Sync');
  //   // await sequelizer.sync();
  // }

  await createInitData();
  // startProduction();
})();

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(PORT, () => {
  logger.info(`Server started on PORT ${PORT}`);
});
