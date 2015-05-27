var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    util = require('util'),
    jade = require('jade'),
    gamers = [];
    

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static("assets"));


app.get('/', function(req,res){
    res.render('index');
});



io.on("connection",function(socket){
    console.log('hello new user');
    // gamers.push(socket.id);
    
    socket.on("disconnect",function(){
    console.log('bye my user!')
    //     console.log(gamers.indexOf(socket.id));
    //     console.log(gamers);
    //     gamers.splice(gamers.indexOf(socket.id),1)
    //     console.log(gamers);
    //     socket.broadcast.emit('playerLeft',socket.id);
    });
    socket.on('hello_message',function(data){
        socket.broadcast.emit("youPush", 'Кто то кликнул на мед, но не вы.');
        socket.emit('youPush', 'вы кликнули на мед, привет от сервера.');
        io.sockets.emit('youPush', 'Ура я всем разослал клик');
    })
});

server.listen(process.env.PORT, process.env.HOST);

console.log("server start http://js-leoda.c9.io/");