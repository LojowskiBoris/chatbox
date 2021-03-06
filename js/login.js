'use_strict';

function login(e)
{
    e.preventDefault();

    let mail = $("#mail").val();
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(reg.test(String(mail).toLowerCase()) == false){
        $('<div class="alert alert-danger" role="alert">Veuillez saisir un email valide</div>').insertAfter($("#mail"));
    } 
    else 
    {
        let mdp = $("#mdp").val();
        $.ajax({
            url: 'php/login.php',
            method: 'POST',
            dataType: 'json',
            data: {mail: mail, mdp: mdp},
            success: function(data){
                if(data.result)
                {
                    window.location.href="index.php";
                }
                else
                {
                    $('<div class="alert alert-danger" role="alert">Mail existe pas</div>').insertAfter($("#mail"));
                }
            }
        });
    }  
}

$(document).ready(function()
{
    $("#form-login").on("submit",login);
});