<?php

include "bdd_connection.php";

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

include "pseudo.html";