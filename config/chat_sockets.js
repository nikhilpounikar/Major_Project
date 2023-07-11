
module.exports.chatSockets = function(socketServer){
    const io = require("socket.io")(socketServer, {
        cors: {
          origin: "http://localhost:5000",
          methods: ["GET", "POST"],
          allowedHeaders: ["my-custom-header"],
          credentials: true
        }
    });

    io.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

    });

}