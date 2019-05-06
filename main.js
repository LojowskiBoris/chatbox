'use_strict';

function verifyDiscussionExist(e)
{
    e.preventDefault();
    let nameDiscussion = $("#discussion").val();
    let mode=$(this).attr("id");

    $.ajax({
        url: 'traitement.php',
        method: 'POST',
        dataType: 'json',
        data: {nomDiscussion: nameDiscussion},
        success: function(data){
            if(data.exist)
            {
                if(mode == "login")
                {
                    window.location.href="pseudo.html?id="+data.id['Id']+"&mode=join";
                }
                else
                {
                    $("#error").show();
                }
            }
            else
            {
                if(mode == "creation")
                {
                    window.location.href="pseudo.html?name="+nameDiscussion+"&mode=create";
                }
                else
                {
                    $("#error").show();
                }
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
    let nameDiscussion = 0;

    for (var i=0;i<vars.length;i++)
    {
        pair.push(vars[i].split("="));
        if(pair[i][0] == 'id'){idDiscussion = pair[i][1];}
        if(pair[i][0] == 'name'){nameDiscussion = pair[i][1];}
        if(pair[i][0] == 'mode'){mode = pair[i][1];}
    }

    console.log(idDiscussion);
    console.log(nameDiscussion);
    console.log(mode);

    if(pseudo != '')
    {
        $.ajax({
            url: 'boris.php',
            method: 'POST',
            dataType: 'json',
            data: {idDiscussion: idDiscussion, nomDiscussion: nameDiscussion ,pseudo: pseudo,mode: mode},
            success: function(data){
                if(data.idUser && data.idUser)
                {
                    window.location.href="message.php?idDiscussion="+data.idDiscussion+"&idUser="+data.idUser;
                }
            }
        });
    }
}

$(document).ready(function()
{
    $("#error").hide();
    $("#creation").on("submit",verifyDiscussionExist);
    $("#login").on("submit",verifyDiscussionExist);
    $("#form-pseudo").on("submit",log);
});