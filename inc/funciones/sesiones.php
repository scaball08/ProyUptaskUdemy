<?php 

function usuario_autenticado(){
  if (!revisar_usuario()) {
  	header('Location:login.php');
  	exit();
  } 
  
}

function revisar_usuario(){
	//retornar el valor de la variable del servidor: $_SESSION['nombre']
   return isset($_SESSION['nombre']);
}

// iniciar la sesion
session_start();
//autenticar usuario
usuario_autenticado();

?>