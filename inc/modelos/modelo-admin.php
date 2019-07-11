<?php 
$arreglo =  array('respuesta'=>'Desde MODELO'
             );

$accion = $_POST['tipo'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];


if ($accion === 'crear') {
	// Codigo para crear los administradores
    
    //hashear passwords
    $opciones = array(
                'cost'=> 12);

    $hash_password = password_hash($password,PASSWORD_BCRYPT,$opciones);

  
try {
         
          require_once('../funciones/conexion.php');

          $mysql = new Connection();

        
          $id_c = 0;
          $conexion = $mysql->get_connection();
          // PREPARO LA SENTINCIA PARA la funcion fn_ins_reg
          $prep_statem = $conexion->prepare("select fn_ins_user(?,?) AS 'id_c'"); 
          //INSERTO LOS PARAMETROS EN LA SENTENCIA PREPARADA
          $prep_statem->bind_param("ss",$usuario,$hash_password);
          // EJECUTO LA SENTENCIA
           $resp = $prep_statem->execute();
           $prep_statem->bind_result($id_c);
           $prep_statem->fetch();

          if($id_c!=0){
            $respuesta = array('respuesta'=>'correcto',
                                    'id_c'=>$id_c,
                                    'tipo'=>$accion);
          }else {

            $respuesta = array('respuesta'=>'ERROR');
          }

          $prep_statem->close();
          $conexion->close();


} catch (Exception $e) {
  $error = $e->getMessage();

  $respuesta = array('pass'=>$error);


}
    echo json_encode($respuesta);
    
}

if ($accion === 'login') {
	// escribir codigo para loguear a los administradores
	
try {
         
          require_once('../funciones/conexion.php');

          $mysql = new Connection();

        
          $id_c = 0;
          $conexion = $mysql->get_connection();
          // PREPARO LA SENTINCIA PARA la funcion fn_ins_reg
          $prep_statem = $conexion->prepare("select usuario , id , password from usuarios where usuario = ? ;"); 
          //INSERTO LOS PARAMETROS EN LA SENTENCIA PREPARADA
          $prep_statem->bind_param("s",$usuario);
          // EJECUTO LA SENTENCIA
           $resp = $prep_statem->execute();

           //loguear usuario
           $prep_statem->bind_result($nombre_usuario,$id_usuario,$password_usuario);
           $prep_statem->fetch();

          if($nombre_usuario){
                // El usuario existe Verificar el password
          	if (password_verify($password ,$password_usuario)) {
                 //login correcto
               
                //Iniciar la Sesion
                session_start();
                $_SESSION['nombre'] = $usuario  ;
                $_SESSION['id'] = $usuario ;
                $_SESSION['login'] = true ; 

          		$respuesta = array('respuesta'=>'correcto',
          	                        'nombre'=> $nombre_usuario,
          	                         'tipo'=>$accion);
          	} else {
          		$respuesta = array('resultado'=>'Password Incorrecto');
          	}
          	
            
          }else {

            $respuesta = array('error'=>'Usuario no existe');
          }

          $prep_statem->close();
          $conexion->close();


} catch (Exception $e) {
  $error = $e->getMessage();

  $respuesta = array('ERROR'=>$error);


}
    echo json_encode($respuesta);
	
}

?>