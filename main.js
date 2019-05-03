'use_strict';


function creationDiscussion(e)
{
    e.preventDefault();
    
    let nameDiscussion = $("#discussion").val();

    $.ajax({
        url: 'index.php',
        method: 'POST',
        dataType: 'json',
        data: {nomDiscussion: nameDiscussion},
        success: function(data){
            if(data.exist)
            {
                //erreur discussion existe deja
                $("#error").show();
            }
            else
            {
                //ok on cree
                window.location.href="pseudo.html?id="+data.id['Id']+"&mode=create";
            }
        }
    });
}

function rejoindreDiscussion(e)
{
    e.preventDefault();

    let nameDiscussion = $("#discussion").val();

    $.ajax({
        url: 'index.php',
        method: 'POST',
        dataType: 'json',
        data: {nomDiscussion: nameDiscussion},
        success: function(data){
            if(!data.exist)
            {
                //erreur discussion existe pas
                $("#error").show();
            }
            else
            {
                //ok on cree
                window.location.href="pseudo.html?id="+data.id['Id']+"&mode=join";
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
    let pair=[];

    let mode = 0;
    let idDiscussion = 0;

    for (var i=0;i<vars.length;i++) 
    {
        pair.push(vars[i].split("="));
        console.log(pair[i]);
        if(pair[i][0] == 'id'){idDiscussion = pair[1];}
        if(pair[i][0] == 'mode'){mode = pair[1];}
    }
    console.log(mode);
    console.log(idDiscussion);

    $.ajax({
        url: 'boris.php',
        method: 'POST',
        dataType: 'json',
        data: {idDiscussion: idDiscussion, mode: mode},
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