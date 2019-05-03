'use_strict';


function creationDiscussion(e)
{
    e.preventDefault();
    
    let nameDiscussion = $("#discussion").val();

    $.ajax({
        url: 'boris.php',
        method: 'POST',
        dataType: 'json',
        data: {mode: 'creation' ,nomDiscussion: nameDiscussion},
        success: function(data){
            if(data.exist)
            {
                //erreur discussion existe deja
                $("#error").show();
            }
            else
            {
                //ok on cree
                window.location.href="pseudo.html?id="+data.id['Id'];
            }
        }
    });
}

function rejoindreDiscussion(e)
{
    e.preventDefault();

    let nameDiscussion = $("#discussion").val();

    $.ajax({
        url: 'boris.php',
        method: 'POST',
        dataType: 'json',
        data: {mode: 'join',nomDiscussion: nameDiscussion},
        success: function(data){
            if(!data.exist)
            {
                //erreur discussion existe pas
                $("#error").show();
            }
            else
            {
                //ok on cree
                window.location.href="pseudo.html?id="+data.id['Id'];
            }
        }
    });
}

function log(e)
{
    e.preventDefault();

    let pseudo = $("#pseudo").val();

    let query = window.location.search.substring(1);
    let vars = query.split("&");
    let idDiscussion = 0;

    for (var i=0;i<vars.length;i++) 
    {
        var pair = vars[i].split("=");
        if(pair[0] == 'id'){id = pair[1];}
    }

    $.ajax({
        url: 'boris.php',
        method: 'POST',
        dataType: 'json',
        data: {idDiscussion: idDiscussion, pseudo: pseudo},
        success: function(data){
            if(data.result)
            {
                window.location.href="message.html?idDiscussion="+idDiscussion+"&idUser="+idUser;
            }
        }
    });
}

$(document).ready(function()
{
    $("#error").hide();
    $("#creation").on("submit",creationDiscussion);
    $("#login").on("submit",rejoindreDiscussion);
    $("#form-pseudo").on("submit",log);
});