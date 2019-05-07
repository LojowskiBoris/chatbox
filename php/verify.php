<?php

//verifier discussion existe

if(!empty($_POST) && array_key_exists('nomDiscussion', $_POST))
{
	include "bdd_connection.php";
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
	}
	$result=['exist'=>$exist, 'id'=>$idDiscussion];
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
		var_dump($_GET);
		include '../join.phtml';
	}
}

