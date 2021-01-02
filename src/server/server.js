import express from 'express';
import mongoose from 'mongoose';

require("dotenv/config");

const server = express();
const mainRoute = require('./routes/main-page');
const salesRoute = require('./routes/sales');

server.use(express.static('dist'));
server.use(express.json());
server.use("/", mainRoute);
server.use("/sales", salesRoute);

mongoose.connect(process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

server.listen(4242);