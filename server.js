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

let userNameToId=[];
let idToUsername=[];

io.on('connection',socket => {
   console.log(socket.id);  // New Id on opening new tab or refresh page


    socket.on('register',data=>{
        userNameToId[data.username]=socket.id;
        idToUsername[socket.id]=data.username;
    });

    socket.on('sendMsg',data=>{

        if(idToUsername[socket.id]){         // Check if user is registered
            let msg=data.message;
            if(msg.charAt(0)==='@'){
                let idArr=msg.split(' ')[0];
                let id=idArr.substring(1);

                let msgArr=msg.split(' ');
                msgArr.splice(0,1);

                // Socket.io creates a room by default with roomName as socketId of the user
                // Sends to every user in room including sender
                io.in(userNameToId[id]).emit('recMsg',{message:msgArr.join(' '),id:idToUsername[socket.id]});

            }
            else{
                  io.emit('recMsg',{message:msg,id:idToUsername[socket.id]});
            }
        }


    })
});

// Not app.listens
server.listen(4444,function () {
   console.log("Server started at http://localhost:4444");
});