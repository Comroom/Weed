import server from '../bin/www';
import {chat} from '../db';
import socket from 'socket.io';

const io = socket.listen(server);
global.io = io;

io.sockets.on('connection', socket => {
  socket.on('roomName', roomName => {
    chat.find({roomName: roomName}).sort({createdAt: 1}).exec((err, docs) => {
      if (err) {
        socket.emit('toclient', []);
        return;
      }
      for (var i = 0; i < docs.length; i++) {
        socket.emit('toclient', docs[i]);
      }
    });
  });

  socket.on('fromclient', data => {
    data.createdAt = new Date();
    chat.insert(data, (err, docs) => {
      if (err) return;
    });
    socket.broadcast.emit('toclient', data);
    socket.emit('toclient', data);
  });
});
