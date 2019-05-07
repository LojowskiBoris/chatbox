'use_strict';

function log(e)
{
    e.preventDefault();

    let pseudo = $("#pseudo").val();

    let idDiscussion = 0;
    let nameDiscussion = 0;
    let mode = 0;

    let query = window.location.search.substring(1);
    let vars = query.split("&");
    let pair=[];

    for (var i=0;i<vars.length;i++)
    {
        pair.push(vars[i].split("="));
        if(pair[i][0] == 'id'){idDiscussion = pair[i][1];}
        if(pair[i][0] == 'name'){nameDiscussion = pair[i][1];}
        if(pair[i][0] == 'mode'){mode = pair[i][1];}
    }
    
    $.ajax({
        url: 'pseudo.php',
        method: 'POST',
        dataType: 'json',
        data: {idDiscussion: idDiscussion, nomDiscussion: nameDiscussion ,pseudo: pseudo, mode: mode},
        success: function(data){
            console.log(data);
            if(data.idDiscussion)
            {
                window.location.href="message.php?idDiscussion="+data.idDiscussion;
            }
        }
    });
}   


$(document).ready(function()
{
    $("#form-pseudo").on("submit",log);
});