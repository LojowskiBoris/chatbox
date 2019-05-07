<?php
session_start();
if(array_key_exists("idUser", $_POST) 
	&& array_key_exists("message", $_POST) 
	&& array_key_exists("idDiscussion", $_POST))
{
	include "bdd_connection.php";
	$message = $_POST['message'];
	$idUser = $_POST['idUser'];
	$idDiscussion = $_POST['idDiscussion'];

	$requete = $pdo->prepare("
		INSERT INTO `Message`(`Content`, `AuthorId`, `DiscussionId`) VALUES (?,?,?)
		");
	$requete->execute([$message,$idUser,$idDiscussion]);
}
else if(array_key_exists("idDiscussion", $_POST) && array_key_exists("idMessages", $_POST))
{ 
	include "bdd_connection.php";
	$idDiscussion = $_POST['idDiscussion'];
	$idMessages = $_POST['idMessages'];
	$idMessages = implode(',',$idMessages);
	$query = ('SELECT `Id`, `Content`, `Date`, `AuthorId` FROM `Message` WHERE `DiscussionId` = ? AND `Id` NOT IN (' . $idMessages . ')');
	$requete = $pdo->prepare($query);
	$requete->execute([$idDiscussion]);
	$messages = $requete->fetchAll();
	echo json_encode($messages);
}
else
{
    if(!isset($_SESSION['idUser']))
    {
        header('Location: login.php');
        exit();
    }
    else
    {
        include '../message.phtml';
    }
}






