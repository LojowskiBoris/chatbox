'use_strict';

function verifyDiscussionExist(e)
{
    e.preventDefault();
    let nameDiscussion = $("#discussion").val();
    let mode=$(this).attr("data-mode");

    $.ajax({
        url: 'verify.php',
        method: 'POST',
        dataType: 'json',
        data: {nomDiscussion: nameDiscussion},
        success: function(data){
            if(data.exist)
            {
                console.log(data.exist,mode);
                if(mode == "join")
                {
                    window.location="../pseudo.html?id="+data.id['Id']+"&mode=join";
                }
                else
                {
                    $("#error").show();
                }
            }
            else
            {
                console.log(data.exist,window.location.href);
                if(mode == "creation")
                {
                    window.location="../pseudo.html?name="+nameDiscussion+"&mode=create";
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

    let mail = $("#mail").val();
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(reg.test(String(mail).toLowerCase()) == false){
            $('<div class="alert alert-danger" role="alert">Veuillez saisir un email valide</div>').insertAfter($("#mail"));
    } else 
    {
        let mdp = $("#mdp").val();
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

        if(pseudo != '')
        {
            $.ajax({
                url: 'join.php',
                method: 'POST',
                dataType: 'json',
                data: {idDiscussion: idDiscussion, nomDiscussion: nameDiscussion ,pseudo: pseudo, mode: mode, mail: mail, mdp: mdp},
                success: function(data){
                    if(data.idUser && data.idUser)
                    {
                        window.location.href="boris.php?idDiscussion="+data.idDiscussion+"&idUser="+data.idUser;
                    }
                }
            });
        }
    }   
}

$(document).ready(function()
{
    $("#error").hide();
    $("#form-creation").on("submit",verifyDiscussionExist);
    $("#form-join").on("submit",verifyDiscussionExist);
    $("#form-pseudo").on("submit",log);
});