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
        $('.comment').val();
        socket.emit('new message', {user:document.getElementById('name').value,message:$('.comment').val()});
        $('.content').html()+$('.content').append('<b>'+document.getElementById('name').value+'</b>: <p>'+$('.comment').val()+'</p><br><br>');
        $('.comment').val('');
    });
    socket.on('message for all', function(createNewMessage){
        $('.content').html()+$('.content').append('<b>'+createNewMessage.user+'</b>: <p>'+createNewMessage.message+'</p><br><br>');
    });
    $('.button').on('click', function(){
        var myTextField = document.getElementById('name');
	    socket.emit('New', myTextField.value);

        $('form').animate({opacity:0}, 500);
        $('.chat').animate({opacity:1, zIndex:10}, 500);
        $('.menu').animate({opacity:1}, 500);
 
        socket.on('disco', function(leftMan){
            console.log(leftMan + " – игрок вышел из игры");
        });
    });
    $('.play_pause').on('click', function(){
    var alphabet = [
        {name:'A',keyCodeEng:65,keyCodeEngSmall:97,keyCodeRu:1060,keyCodeRuSmall:1092},
        {name:'B',keyCodeEng:66,keyCodeEngSmall:98,keyCodeRu:1048,keyCodeRuSmall:1080},
        {name:'C',keyCodeEng:67,keyCodeEngSmall:99,keyCodeRu:1057,keyCodeRuSmall:1089},
        {name:'D',keyCodeEng:68,keyCodeEngSmall:100,keyCodeRu:1042,keyCodeRuSmall:1074},
        {name:'E',keyCodeEng:69,keyCodeEngSmall:101,keyCodeRu:1059,keyCodeRuSmall:1091},
        {name:'F',keyCodeEng:70,keyCodeEngSmall:102,keyCodeRu:1040,keyCodeRuSmall:1072},
        {name:'G',keyCodeEng:71,keyCodeEngSmall:103,keyCodeRu:1055,keyCodeRuSmall:1087},
        {name:'H',keyCodeEng:72,keyCodeEngSmall:104,keyCodeRu:1056,keyCodeRuSmall:1088},
        {name:'I',keyCodeEng:73,keyCodeEngSmall:105,keyCodeRu:1064,keyCodeRuSmall:1096},
        {name:'J',keyCodeEng:74,keyCodeEngSmall:106,keyCodeRu:1054,keyCodeRuSmall:1086},
        {name:'K',keyCodeEng:75,keyCodeEngSmall:107,keyCodeRu:1051,keyCodeRuSmall:1083},
        {name:'L',keyCodeEng:76,keyCodeEngSmall:108,keyCodeRu:1044,keyCodeRuSmall:1076},
        {name:'M',keyCodeEng:77,keyCodeEngSmall:109,keyCodeRu:1068,keyCodeRuSmall:1100},
        {name:'N',keyCodeEng:78,keyCodeEngSmall:110,keyCodeRu:1058,keyCodeRuSmall:1090},
        {name:'O',keyCodeEng:79,keyCodeEngSmall:111,keyCodeRu:1065,keyCodeRuSmall:1097},
        {name:'P',keyCodeEng:80,keyCodeEngSmall:112,keyCodeRu:1047,keyCodeRuSmall:1079},
        {name:'Q',keyCodeEng:81,keyCodeEngSmall:113,keyCodeRu:1049,keyCodeRuSmall:1081},
        {name:'R',keyCodeEng:82,keyCodeEngSmall:114,keyCodeRu:1050,keyCodeRuSmall:1082},
        {name:'S',keyCodeEng:83,keyCodeEngSmall:115,keyCodeRu:1067,keyCodeRuSmall:1099},
        {name:'T',keyCodeEng:84,keyCodeEngSmall:116,keyCodeRu:1045,keyCodeRuSmall:1077},
        {name:'U',keyCodeEng:85,keyCodeEngSmall:117,keyCodeRu:1043,keyCodeRuSmall:1075},
        {name:'V',keyCodeEng:86,keyCodeEngSmall:118,keyCodeRu:1052,keyCodeRuSmall:1084},
        {name:'W',keyCodeEng:87,keyCodeEngSmall:119,keyCodeRu:1062,keyCodeRuSmall:1094},
        {name:'X',keyCodeEng:88,keyCodeEngSmall:120,keyCodeRu:1063,keyCodeRuSmall:1095},
        {name:'Y',keyCodeEng:89,keyCodeEngSmall:121,keyCodeRu:1053,keyCodeRuSmall:1085},
        {name:'Z',keyCodeEng:90,keyCodeEngSmall:122,keyCodeRu:1071,keyCodeRuSmall:1103},
        {name:'Ъ',keyCodeRu:1066,keyCodeRuSmall:1098},
        {name:'Х',keyCodeRu:1061,keyCodeRuSmall:1093},
        {name:'Ж',keyCodeRu:1046,keyCodeRuSmall:1078},
        {name:'Э',keyCodeRu:1069,keyCodeRuSmall:1101},
        {name:'Ю',keyCodeRu:1070,keyCodeRuSmall:1103},
        {name:'Б',keyCodeRu:1071,keyCodeRuSmall:1102},
        {name:'Ё',keyCodeRu:1041,keyCodeRuSmall:1073}];
        
        console.log("Щёлк!");
        socket.on('smth',function(randomOb){
            //$('body').append()
            
            var sq= document.createElement('div');
            sq.className = 'square'+randomOb.forBox;
            var contRnd = document.createElement('div');
            contRnd.className = 'mainContent'+randomOb.forBox;
            
            $("body").append($(contRnd).append(sq));
            $(contRnd).css('left',randomOb.forLeft);
            
            // console.log(alphabet[rletter])
            $(sq).html(alphabet[randomOb.forLetter].name);
            $(sq).addClass('letterstyle');
            $(sq).addClass(alphabet[randomOb.forLetter].name);
            
                $(document).on('keypress',function(event){
                // var sq;
                // console.log(event);
                for(var i = 0;i<alphabet.length;i++){
                    //console.log(alphabet[i].keyCodeEng);
                    //console.log(event.charCode);
                    if(event.charCode==alphabet[i].keyCodeEng||event.charCode==alphabet[i].keyCodeRu||event.charCode==alphabet[i].keyCodeEngSmall||event.charCode==alphabet[i].keyCodeRuSmall){
                        // console.log('Вы нажали '+alphabet[i].name);
                        if($("."+alphabet[i].name).length){
                            $('.'+alphabet[i].name).remove();
                            var now = $('.points').html();
                            $('.points').html(parseInt(now)+parseInt(1));
                            
                            socket.emit('Click',alphabet[i].name);   
                        }
                    }
                    else{
                        setTimeout(function(){
                            // console.log('.mainContent'+rand)
                            // var life = $('.lifes').html();
                            // $('.lifes').html(parseInt(life)-parseInt(1)); 
                            $(contRnd).remove();
                                // if (life == 1){
                                //     console.log("GAME OVER!!!");
                                //     //происходит конец игры
                                // }
                        }, 10000); 
                    }
                    
                }
            });
            socket.on('Delete', function(delSq){
                // console.log(delSq)
                $('.'+delSq).remove();
            });
        });
    });
    socket.on('minusOne', function(){
        var life = $('.lifes').html();
        $('.lifes').html(parseInt(life)-parseInt(1));
        if (life == 1){
            // console.log("GAME OVER!!!");
            //происходит конец игры
            var gamer = document.getElementById('name').value;
            var count = $('.points').html();
            var youAreLoser = {};
            youAreLoser.name = gamer;
            youAreLoser.score = count;
            
            socket.emit('lose', youAreLoser);
        }
    });
    socket.on('youLose', function(){
        // var divEnd = document.createElement('div');
        // divEnd.className = "end";
        // divEnd.innerText = 'Your score is'+ $('.points').html().value;
        // $('body').append(divEnd);
        $('.end').html('Your score is'+ $('.points').html())
        $('.end').animate({opacity:1}, 200);
        $('.end').animate({top:0}, 100);
        $('.restart').animate({top:'50px'}, 500);
    });
    socket.on('heLose', function(heIsLoser){
        $('.content').html()+$('.content').append('<b>'+heIsLoser.name+'</b>: <p> lose with score'+ heIsLoser.score +'</p><br><br>');
    })
});