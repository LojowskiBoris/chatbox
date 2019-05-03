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
}
$result=['exist'=>$exist, 'id'=>$idDiscussion];
echo json_encode($result);

