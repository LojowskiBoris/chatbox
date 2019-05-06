<?php 

if(array_key_exists('mode',$_POST) && array_key_exists('idDiscussion',$_POST) && array_key_exists('nomDiscussion',$_POST))
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
    INSERT INTO `User`(`Name`, `Role` , `DiscussionId`) VALUES (?,?,?)
    ");
    $requete->execute([$pseudo, $role ,$idDiscussion]);
    $idUser = $pdo->lastInsertId();
    echo json_encode(['idDiscussion' => $idDiscussion, 'idUser' => $idUser]);
}
else
{
    session_start();
    if(!isset($_SESSION['idUser']))
    {
        header('Location: login.html');
        exit();
    }
    else
    {
        include '../join.phtml';
    }
}