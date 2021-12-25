const { io } = require('../index');

const { verifyJWT } = require('../helpers/json-web-token');
const { connectedUser, disconnectedUser, saveMessage } = require('../controllers/socket');

io.on('connection', client => {
  const [valid, uid] = verifyJWT(client.handshake.headers['x-token']);
  if (!valid) return client.disconnect();
  connectedUser(uid)

  client.join(uid)

  client.on('private-message', async (payload) => {
    await saveMessage(payload)
    io.to(payload.to).emit('private-message', payload)
  });

  client.on('disconnect', () => disconnectedUser(uid))
});
