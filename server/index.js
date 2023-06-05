const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const db = require('./db');
const sequelize = require('./sequelize');
const { PORT } = require('./config');
const logger = require('./logger');
const userRoutes = require('./db/routes/user.route');
const buildingRoutes = require('./db/routes/building.route');
const actionsRoutes = require('./db/routes/action.route');
const { startProduction } = require('./production');

require('./db/models/associations');

const app = express();

const server = http.createServer(app);

global.io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

(async () => {
  await db.connect();
  await sequelize.connect();
  await startProduction();
})();

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
app.use(buildingRoutes);
app.use(actionsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(PORT, () => {
  logger.info(`Server started on PORT ${PORT}`);
});
