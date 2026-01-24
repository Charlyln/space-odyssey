require('dotenv').config();

const config = {
  PORT: 8080,
  DBPATH: process.env.DBPATH || process.cwd() + '/db.sqlite',
};

module.exports = config;
