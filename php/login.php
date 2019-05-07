<?php 

function verifyPassword($password, $hashPassword)
{
    return crypt($password, $hashPassword) == $hashPassword;
}

if(array_key_exists('mail',$_POST) && array_key_exists('mdp',$_POST) && !empty($_POST['mail']) && !empty($_POST['mdp']))
{
    $result =['result' => false];
    include "bdd_connection.php";

    $mail = $_POST['mail'];

    $requete = $pdo->prepare("
    SELECT `Id`,`Mdp` FROM `User` WHERE `Mail`=?
    ");
    $requete->execute([$mail]);
    $user = $requete->fetch();

    $mdp = $user['Mdp'];
    if(verifyPassword($_POST['mdp'],$mdp))
    {
        session_start();
        if(!isset($_SESSION['idUser']))
        {
            $_SESSION['idUser'] = stripslashes(htmlspecialchars($user['Id']));
        }
        $result =['result' => true];
    }
    echo json_encode($result);
}
else
{
    session_start();
    if(!isset($_SESSION['idUser']))
    {
        header('Location: ../login.php');
        exit();
    }
    else
    {
        include '../login.phtml';
    }
}
