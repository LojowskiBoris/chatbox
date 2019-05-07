<?php 

session_start();
if(!isset($_SESSION['idUser']))
{
    header('Location: login.phtml');
    exit();
}
else
{
    include 'index.phtml';
}