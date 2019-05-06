<?php 

session_start();
if(!isset($_SESSION['idUser']))
{
    header('Location: login.html');
    exit();
}
else
{
    include 'index.phtml';
}