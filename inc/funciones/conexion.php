<?php 

class Connection{
   private  $conn;
	
	public function __construct()
	{ global $conn;
		$this->$conn = new mysqli("localhost","root","","uptask");

	}
    
    public function get_connection(){
    	global $conn;
    	return $this->$conn;
    }

    public function test_input($data) {
              // limpiar caracteres especiales 
              $data = trim($data);
              $data = stripslashes($data);
              $data = htmlspecialchars($data);
              return $data;
            }
     public function peticion_ajax(){
              return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] = 'XMLHttpRequest' ;
            }       


}
  

?>