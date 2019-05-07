<?php 
session_start();
if(array_key_exists('mode',$_POST) && array_key_exists('idDiscussion',$_POST) && array_key_exists('nomDiscussion',$_POST)&& array_key_exists('pseudo',$_POST))
{
    include "bdd_connection.php";

    $mode = $_POST['mode'];
    if($mode == 'join')
    {
        $role = 'USER';
        $idDiscussion = $_POST['idDiscussion'];
    }
    else
    {
        $role = 'ADMIN';
        $nameDiscussion = $_POST['nomDiscussion'];

        $requete = $pdo->prepare("
        INSERT INTO `Discussion`(`Name`) VALUES (?)
        ");
        $requete->execute([$nameDiscussion]);
        $idDiscussion = $pdo->lastInsertId();
    }

    $pseudo = $_POST['pseudo'];
    $requete = $pdo->prepare("
    UPDATE `User` SET `Name`=?,`Role`=?,`DiscussionId`=? WHERE `Id`=?
    ");
    $requete->execute([$pseudo, $role ,$idDiscussion,$_SESSION['idUser']]);

    $_SESSION['idDiscussion'] = $idDiscussion;
    echo json_encode(['idDiscussion' => $idDiscussion]);
}
else
{
    if(!isset($_SESSION['idUser']))
    {
        header('Location: ../login.php');
        exit();
    }
    else
    {
        include '../pseudo.phtml';
    }
}



