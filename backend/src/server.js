require('dotenv/config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');

const db_URL = process.env.DB_URL;

const server = express();

mongoose.connect(db_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(morgan('dev'));
server.use(express.static('public'));

server.use(routes);
server.listen(3333);