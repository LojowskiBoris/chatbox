<?php

var_dump($_GET);

var_dump($_SESSION);

$_SESSION['idUser'] = stripslashes(htmlspecialchars($_GET['idUser']));

session_start();
$_SESSION['idDiscussion'] = stripslashes(htmlspecialchars($_GET['idDiscussion']));