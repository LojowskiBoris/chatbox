


function textingMessage(e){
	e.preventDefault();
	var message = $('#usermsg').val();

	

	$ .ajax ({
		url: "message.php",
		data: {message:message, idUser:1, idDiscussion: 1},
		method: 'POST',
		success: function(){
			console.log('ok');
		}
	});	


}

function getAllMessages(){
	

	let userId = 1;
	$.ajax({
		url: "message.php",
		data: {idDiscussion:1},
		method :'POST',
		dataType: 'json',
		success: function(data){
			console.log(data);
			$('#chatbox').html('');
			for (var i = 0; i < data.length; i++) {
				console.log(data.length);

				if(userId== data[i].AuthorId ){
					$('#chatbox').append('<p class="recu">'+ data[i].Content + '<br><span class="date">'+data[i].Date+'</span> </p> <div class="clear"></div>');	

				}else{
					$('#chatbox').append('<p class="envoi">'+ data[i].Content + '<br><span class="date">'+data[i].Date+'</span> </p> <div class="clear"></div>');
				}
			}
		}
	});

}


$(document).ready(function()
{
	getAllMessages();
	$("#message").on("submit",textingMessage);
    //setInterval(getAllMessages,10000);
});
