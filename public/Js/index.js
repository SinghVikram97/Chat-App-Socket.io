let socket=io();

$(document).ready(function () {

    let login=$("#login-container");
    let chat=$("#chat-container");

    let username=$("#username");
    let loginBtn=$("#login");

    let message=$("#message");
    let send=$("#send");
    let list=$("#list");

    send.click(function () {
        let msg=message.val();
        let user=username.val();
        message.val('');
        username.val('');
        socket.emit('sendMsg',{message:msg,username:user});
    });

    socket.on('recMsg',data=>{
        console.log(data.message);
        console.log(data.username);
       list.append('<li>'+data.username+':'+data.message+'</li>')
    })

});