const { socket } = require("server/router");

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: ['http://localhost:3000']
    }
});

io.on("connection", (socket) => {
    console.log('a user connected: ' + socket.id);
    socket.once('join_room', (room) => {
        socket.join(room);
        socket.r = room;
        console.log('user ' + socket.id + ' has joined room: ' + room);
    })
    socket.on('new movie', (movie) => {
        io.to(socket.r).emit('new movie', movie);
        console.log(movie.title + ' has been added.');
    })
    socket.on('remove movie', (movie) => {
        io.to(socket.r).emit('remove movie', movie)
        console.log(movie.title + ' has been removed.')
    })
});

http.listen(4000, function() {
  console.log("listening on *:4000");
});