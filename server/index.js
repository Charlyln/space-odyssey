const path = require('path');

const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();

const port = 5000;

const server = http.createServer(app);

app.get('/v1', function (req, res) {
  res.status(200).send('Space Odyssey API');
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(cors());
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
