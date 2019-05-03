'use_strict';


function creationDiscussion(e)
{
    e.preventDefault();
    
    let nameDiscussion = $("#discussion").val();

    $.ajax({
        url: 'boris.php',
        method: 'POST',
        dataType: 'json',
        data: {creation: true ,nomDiscussion: nameDiscussion},
        success: function(data){
            if(data.exist)
            {
                //erreur discussion existe deja
                $("#error").show();
            }
            else
            {
                //ok on cree
                window.location.href="message.html?id="+data.id['Id'];
            }
        }
    });
}

function rejoindreDiscussion()
{
    let nameDiscussion = $("#discussion").val();

    $.ajax({
        url: 'boris.php',
        method: 'POST',
        dataType: 'json',
        data: {creation: false,nomDiscussion: nameDiscussion},
        success: function(data){
            if(!data.exist)
            {
                //erreur discussion existe pas
                $("#error").show();
            }
            else
            {
                //ok on cree
                window.location.href="message.html?id=".data.id['Id'];
            }
        }
    });
}

$(document).ready(function()
{
    $("#error").hide();
    $("#creation").on("submit",creationDiscussion);
    $("#login").on("submit",rejoindreDiscussion);
});