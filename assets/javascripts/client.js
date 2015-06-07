// $(document).ready(function() {
//     var socket = io.connect('http://js-leoda.c9.io/');    
//     $('img').on("click",function(){
//       socket.emit('hello_message','Привет')      
//     })
//     socket.on('youPush',function(A){
//         console.log(A);
//     })
// });

$( document ).ready(function() {
    var socket = io.connect('http://js-leoda.c9.io/');
        
    $('.post').on('click', function(){
        $('.comment').val()
        socket.emit('new message', {user:document.getElementById('name').value,message:$('.comment').val()})
        $('.content').html()+$('.content').append('<b>'+document.getElementById('name').value+'</b>: <p>'+$('.comment').val()+'</p><br><br>')
        $('.comment').val('')
    })
    socket.on('message for all', function(createNewMessage){
        $('.content').html()+$('.content').append('<b>'+createNewMessage.user+'</b>: <p>'+createNewMessage.message+'</p><br><br>')
    })
    $('.button').on('click', function(){
        var myTextField = document.getElementById('name');
	    socket.emit('New', myTextField.value)

        $('form').animate({opacity:0}, 500);
        $('.chat').animate({opacity:1, zIndex:10}, 500);
        $('.menu').animate({opacity:1}, 500);
 
        socket.on('disco', function(leftMan){
            console.log(leftMan + " – игрок вышел из игры");
        })
    });
     $('.play_pause').on('click', function(){
        console.log("Щёлк!");
       
    })  
    

});
        
        
        
        
       

