'use_strict';

function log(e)
{
    e.preventDefault();


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

    if(pseudo != '')
    {
        $.ajax({
            url: '../join.php',
            method: 'POST',
            dataType: 'json',
            data: {idDiscussion: idDiscussion, nomDiscussion: nameDiscussion ,pseudo: pseudo, mode: mode},
            success: function(data){
                console.log(data);
                // if(data.idUser && data.idUser)
                // {
                //     window.location.href="../php/boris.php?idDiscussion="+data.idDiscussion+"&idUser="+data.idUser;
                // }
            }
        });
    }
}   


$(document).ready(function()
{
    $("#form-pseudo").on("submit",log);
});