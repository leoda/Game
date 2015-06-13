// var express = require('express'),
//     app = express(),
//     server = require('http').Server(app),
//     io = require('socket.io')(server),
//     util = require('util'),
//     jade = require('jade'),
//     gamers = [];
    

// app.set('views', './views');
// app.set('view engine', 'jade');
// app.use(express.static("assets"));

// app.get('/', function(req,res){
//     res.render('index');
// });

// io.on("connection",function(socket){
//     console.log('hello new user');
//     // gamers.push(socket.id);
    
//     socket.on("disconnect",function(){
//     console.log('bye my user!')
//     //     console.log(gamers.indexOf(socket.id));
//     //     console.log(gamers);
//     //     gamers.splice(gamers.indexOf(socket.id),1)
//     //     console.log(gamers);
//     //     socket.broadcast.emit('playerLeft',socket.id);
//     });
//     socket.on('hello_message',function(data){
//         socket.broadcast.emit("youPush", 'Кто то кликнул на мед, но не вы.');
//         socket.emit('youPush', 'вы кликнули на мед, привет от сервера.');
//         io.sockets.emit('youPush', 'Ура я всем разослал клик');
//     })
// });

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


io.on("connection", function(socket){
    console.log(socket.id + "connected")
    
    // socket.on('New', function(data) {
    //     var infoNew = {};
    //     infoNew.name = data;
    //     infoNew.id = socket.id;
    //     // gamers.push(infoNew);
    // })
    
    socket.on('new message', function(createNewMessage) {
        // console.log("получил сообщение");
        socket.broadcast.emit('message for all', createNewMessage);
        // console.log("отправил сообщение");
    });
    
    socket.on('Click', function(del){
        io.sockets.emit('Delete',del);
        socket.broadcast.emit('minusOne')
    })
    
    socket.on('lose', function(loser){
        socket.emit('youLose');
        socket.broadcast.emit('heLose',loser);
    })
    
    socket.on('disconnect', function() {
        console.log('bye my user!');
        // console.log(gamers.indexOf(socket.id));
        // console.log(gamers);
        for(var i=0;i<gamers.length;i++){
            if(gamers[i].id==socket.id){
                socket.broadcast.emit('disco',gamers[i].name);
                gamers.splice(gamers.indexOf(gamers[i]),1);
                // delete gamers[i]
                // console.log(gamers);
            }
        }
    });
    
});

setInterval(function(){
    var randSq = Math.floor((Math.random() * 3) + 1);//1-3
    var leftSq = Math.floor((Math.random() * 30) + 10)+'%';
    var rletter = Math.floor(Math.random() * 26);
    var randOb = {};
    randOb.forBox = randSq;
    randOb.forLeft = leftSq;
    randOb.forLetter = rletter;
    io.sockets.emit('smth',randOb);
}, 1500);





server.listen(process.env.PORT, process.env.HOST);

console.log("server start http://js-leoda.c9.io/");