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


// Not app.listen
server.listen(4444,function () {
   console.log("Server started at http://localhost:4444");
});