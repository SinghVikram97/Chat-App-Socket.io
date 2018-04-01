const express=require('express');
const socket=require('socket.io');
const path=require('path');

const app=express();

app.use('/',express.static(path.join(__dirname,'public')));

app.listen(4444,function () {
   console.log("Server started at http://localhost:4444");
});