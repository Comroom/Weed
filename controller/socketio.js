var server = require('../bin/www');
var io = require('socket.io').listen(server);
var chat = db['chat'];

io.sockets.on('connection', function(socket) {
  chat.find({}).sort({createdAt: 1}).exec((err, docs) => {
    for (var i = 0; i < docs.length; i++) {
      socket.emit('toclient', docs[i]);
    }
  });

  socket.on('fromclient', function(data) {
    data.createdAt = new Date();
    chat.insert(data, function(err, docs) {
    });
    socket.broadcast.emit('toclient', data);
    socket.emit('toclient', data);
  });
});
