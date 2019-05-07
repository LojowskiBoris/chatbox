let idMessages

function textingMessage(e){
	e.preventDefault();
	let idDiscussion = $("#message").attr("data-idDiscussion");
	let idUser = $("#message").attr("data-idUser");
	var message = $('#usermsg').val();
	$ .ajax ({
		url: "message.php",
		data: {message:message, idUser:idUser, idDiscussion: idDiscussion},
		method: 'POST'
	});	
	$('#usermsg').val('');
	getAllMessages();
}



function getAllMessages(){
	let tab = Array.from($("#chatbox p"));
	if(tab.length != 0)
	{
		idMessages = [];
		let messages = $("#chatbox p");
		let ids =[];
		for (var i = 0; i < messages.length; i++) 
		{
			ids.push($(messages[i]).attr("id"));
			idMessages.push(ids[i]);
		}
	}//méthode plus simple: on utilise le dernier id et on récupère les messages avec un id supérieur

	let idDiscussion = $("#message").attr("data-idDiscussion");
	let idUser = $("#message").attr("data-idUser");
	$.ajax({
		url: "message.php",
		data: {idDiscussion: idDiscussion, idMessages: idMessages},
		method :'POST',
		dataType: 'json',
		success: function(data){
			for (var i = 0; i < data.length; i++) {
				if(idUser== data[i].AuthorId )
				{
					$('#chatbox').append('<p id="'+data[i].Id+'" class="recu">'+ data[i].Content + '<br><span class="date">'+data[i].Date+'</span> </p> <div class="clear"></div>');	
				}
				else
				{
					$('#chatbox').append('<p id="'+data[i].Id+'" class="envoi">'+ data[i].Content + '<br><span class="date">'+data[i].Date+'</span> </p> <div class="clear"></div>');	
				}
			}
			if(data.length != 0)
			{
				if($("#chatbox").length > 0)
				{
					$("#chatbox")[0].scrollTop = $("#chatbox")[0].scrollHeight;
				}
			}
		}	
	});
}

$(document).ready(function()
{
	idMessages = [-1];
	if($("#chatbox").length > 0)
	{
		$("#chatbox")[0].scrollTop = $("#chatbox")[0].scrollHeight;
	}
	$("#chatbox").html('');
	

	getAllMessages();
	setInterval(function(){
		getAllMessages()
	},3000);
	$("#message").on("submit",textingMessage);
});
