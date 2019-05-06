<?php

include "bdd_connection.php";

//insert login user
var_dump($idDiscussion);
$name = $_POST['name'];
$requete = $pdo->prepare("
INSERT INTO `User`(`Name`, `Role` , `DiscussionId`) VALUES (?,'USER',?)
");
$requete->execute([$name, $idDiscussion]);

// //insert message
// $message = $_POST['message'];
// $idUser = $_POST['idUser'];
// $idDiscussion = $_POST['idDiscussion'];
// $requete = $pdo->prepare("
// INSERT INTO `Message`(`Content`, `AuthorId`, `DiscussionId`) VALUES (?,?,?)
// ");
// $requete->execute([$message,$idUser,$idDiscussion]);

//verifier discussion existe

$nameDiscussion = $_POST['nomDiscussion'];
$nameDiscussion = strtoupper ( $nameDiscussion );
$nameDiscussion=str_replace (' ', '-', $nameDiscussion );
$requete = $pdo->prepare("
SELECT `Id` FROM `Discussion` WHERE `Name`=?
");
$requete->execute([$nameDiscussion]);
$idDiscussion = $requete->fetch();
if(!empty($idDiscussion))
{
    $exist = true;
}
else
{
    $exist = false;
    if($_POST['mode'] == 'creation')
    {
        $requete = $pdo->prepare("
        INSERT INTO `Discussion`(`Name`) VALUES (?)
        ");
        $requete->execute([$nameDiscussion]);
    }
}
$result=['exist'=>$exist, 'id'=>$idDiscussion];
echo json_encode($result);



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

