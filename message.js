


function textingMessage(){
	var message = $('#usermsg').val();

	$('#chatbox').append('<p class="recu">'+ message +'</p>'+ '<div class="clear"></div>');


}



$(document).ready(function()
{
    
    $("#message").on("submit",textingMessage);
    
});