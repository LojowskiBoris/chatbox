'use_strict';

function verifyDiscussionExist(e)
{
    e.preventDefault();
    let nameDiscussion = $("#discussion").val();
    let mode=$(this).attr("data-mode");

    $.ajax({
        url: 'php/verify.php',
        method: 'POST',
        dataType: 'json',
        data: {nomDiscussion: nameDiscussion},
        success: function(data){
            if(data.exist)
            {
                console.log(data.exist,mode);
                if(mode == "join")
                {
                    window.location="php/pseudo.php?id="+data.id['Id']+"&mode=join";
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
                    window.location="php/pseudo.php?name="+nameDiscussion+"&mode=create";
                }
                else
                {
                    $("#error").show();
                }
            }
        }
    });
}



$(document).ready(function()
{
    $("#error").hide();
    $("#form-creation").on("submit",verifyDiscussionExist);
    $("#form-join").on("submit",verifyDiscussionExist);
});