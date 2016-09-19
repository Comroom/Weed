var server = require('../bin/www');
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  console.log('connect!');
  socket.emit('toclient', {msg: 'Welcome!'});
  socket.on('fromclient', function(data) {
    socket.broadcast.emit('toclient', data);
    socket.emit('toclient', data);
    console.log('Message from client: ' + data.msg);
  });
});
