require('dotenv').config();

const config = {
  PORT: 5000,
  DBPATH: process.env.DBPATH || process.cwd() + '/db.sqlite',
};

module.exports = config;
