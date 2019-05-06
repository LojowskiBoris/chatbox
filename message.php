<?php

include "bdd_connection.php";


if(array_key_exists("idUser", $_POST) 
    && array_key_exists("message", $_POST) 
    && array_key_exists("idDiscussion", $_POST)){

		// //insert message
		 $message = $_POST['message'];
		 $idUser = $_POST['idUser'];
		 $idDiscussion = $_POST['idDiscussion'];

 $requete = $pdo->prepare("
 INSERT INTO `Message`(`Content`, `AuthorId`, `DiscussionId`) VALUES (?,?,?)
 ");
 $requete->execute([$message,$idUser,$idDiscussion]);
    }


if(array_key_exists("idDiscussion", $_POST)){ 
    

$idDiscussion = $_POST['idDiscussion'];
 $requete = $pdo->prepare("
 SELECT `Content`, `Date`, `AuthorId` FROM `Message` WHERE DiscussionId = ?
 ");
 $requete->execute([$idDiscussion]);
 $messages = $requete->fetchAll();
 echo json_encode($messages);

    

};

?>



 
