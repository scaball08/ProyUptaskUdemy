<?php 
$accion = $_POST['tipo'];
$proyecto = $_POST['proyecto'];

if ($accion === 'crear') {
	// Codigo para crear los administradores
  
try {
         
          require_once('../funciones/conexion.php');

          $mysql = new Connection();

        
          $id_c = 0;
          $conexion = $mysql->get_connection();
          // PREPARO LA SENTINCIA PARA la funcion fn_ins_reg
          $prep_statem = $conexion->prepare("select fn_ins_proy(?) AS 'id_c'"); 
          //INSERTO LOS PARAMETROS EN LA SENTENCIA PREPARADA
          $prep_statem->bind_param("s",$proyecto);
          // EJECUTO LA SENTENCIA
           $resp = $prep_statem->execute();
           $prep_statem->bind_result($id_c);
           $prep_statem->fetch();

          if($id_c!=0 && !(empty($proyecto))){
            $respuesta = array('respuesta'=>'correcto',
                                    'id_proyecto'=>$id_c,
                                    'tipo'=>$accion,
                                    'nombre_proyecto'=>$proyecto);
          }else {

            $respuesta = array('respuesta'=>'ERROR');
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