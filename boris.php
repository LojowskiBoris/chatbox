<?php

include "bdd_connection.php";

//insert login user

$mode = $_POST['mode'];
$nameDiscussion = $_POST['nomDiscussion'];
if($mode == 'create')
{
    $role = 'USER';

    $requete = $pdo->prepare("
    SELECT `Id` FROM `Discussion` WHERE `Name` = ?
    ");
    $requete->execute([$nameDiscussion]);
    $idDiscussion = $requete->fetch();
}
else
{
    $role = 'ADMIN';
    
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

// //insert message
// $message = $_POST['message'];
// $idUser = $_POST['idUser'];
// $idDiscussion = $_POST['idDiscussion'];
// $requete = $pdo->prepare("
// INSERT INTO `Message`(`Content`, `AuthorId`, `DiscussionId`) VALUES (?,?,?)
// ");
// $requete->execute([$message,$idUser,$idDiscussion]);



// //récupération fil discussion
// $idDiscussion = $_POST['idDiscussion'];
// $requete = $pdo->prepare("
// SELECT `Message`, `Date`, `AuthorId` FROM `Message` WHERE DiscussionId = ?
// ");
// $requete->execute([$idDiscussion]);
// $messages = $requete->fetchAll();
// echo json_encode($messages);

