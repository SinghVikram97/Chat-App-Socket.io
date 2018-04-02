let socket=io();

$(document).ready(function () {

    let login=$("#login-container");
    let chat=$("#chat-container");

    let username=$("#username");
    let loginBtn=$("#login");

    let message=$("#message");
    let send=$("#send");
    let list=$("#list");

    chat.hide();

    loginBtn.click(function () {
       let loginId=username.val();
       username.val('');

       socket.emit('register',{username:loginId});
       login.hide();
       chat.show();
    });

    send.click(function () {
        let msg=message.val();
        message.val('');
        socket.emit('sendMsg',{message:msg});
    });

    socket.on('recMsg',data=>{
        console.log(data.message);
        console.log(data.username);
       list.append('<li>'+data.id+':'+data.message+'</li>')
    })

});