const path = require('path');
const express = require('express');
require('dotenv').config();

require('./database/config').dbConnection()

const app = express();
// reading and parsing the body
app.use(express.json());

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Routes
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Server started at: ', process.env.PORT);
});