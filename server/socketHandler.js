module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('move', (data) => {
      io.emit('sync-move', data);
    });
  });
};