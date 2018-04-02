const express=require('express');
const socketio=require('socket.io');
const path=require('path');
const http=require('http');

const app=express();


// Need to run both app and socket.io on same server

// Creates a server over which app runs
const server=http.createServer(app);

// Server over which socket.io app runs
const io=socketio(server);

// Client side library included at /socket.io/socket.io.js
// io object like dollar of jquery available on console
app.use('/',express.static(path.join(__dirname,'public')));

io.on('connection',socket => {
   console.log(socket.id);  // New Id on opening new tab or refresh page

    socket.on('sendMsg',data=>{
       // Json data received
        io.emit('recMsg',{message:data.message,username:data.username});
    })
});

// Not app.listens
server.listen(4444,function () {
   console.log("Server started at http://localhost:4444");
});