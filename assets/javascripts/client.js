$(document).ready(function() {
    var socket = io.connect('http://js-leoda.c9.io/');    
    $('img').on("click",function(){
      socket.emit('hello_message','Привет')      
    })
    socket.on('youPush',function(A){
        console.log(A);
    })
});



