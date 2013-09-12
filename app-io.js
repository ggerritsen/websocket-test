var io = require('socket.io').listen(8088);

io.sockets.on('connection', function(socket) {
  socket.on('message', function(message) { console.log(message); });
  socket.on('disconnect', function() { console.log("client disconnected."); });
});
