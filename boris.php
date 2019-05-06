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



// //insert message
// $message = $_POST['message'];
// $idUser = $_POST['idUser'];
// $idDiscussion = $_POST['idDiscussion'];
// $requete = $pdo->prepare("
// INSERT INTO `Message`(`Content`, `AuthorId`, `DiscussionId`) VALUES (?,?,?)
// ");
// $requete->execute([$message,$idUser,$idDiscussion]);



// //récupération fil discussion

session_start();
if(isset($_SESSION['name'])){
    $text = $_POST['text'];
     
    $fp = fopen("message.html", 'a');
    fwrite($fp, "<div class='msgln'>(".date("g:i A").") <b>".$_SESSION['name']."</b>: ".stripslashes(htmlspecialchars($text))."<br></div>");
    fclose($fp);
}

// $idDiscussion = $_POST['idDiscussion'];
// $requete = $pdo->prepare("
// SELECT `Message`, `Date`, `AuthorId` FROM `Message` WHERE DiscussionId = ?
// ");
// $requete->execute([$idDiscussion]);
// $messages = $requete->fetchAll();
// echo json_encode($messages);

