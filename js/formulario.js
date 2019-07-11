eventListeners();

function eventListeners(){

	document.querySelector('#formulario').addEventListener('submit', validarRegistro);

}

function validarRegistro(e){
	e.preventDefault();
 var usuario = document.querySelector('#usuario').value,
     password = document.querySelector('#password').value, 
     tipo = document.querySelector('#tipo').value;

     if(usuario === "" || password =="" ){
     	// La validacion fallo
     	swal({
			  type: 'error',
			  title: 'Error!',
			  text: 'Ambos campos son obligatorios'
			  //,footer: '<a href>Why do I have this issue?</a>'
			});
     }else {
     	   // ambos campos son correctos , Mandar AJAX

     	   //construir el formulario con FormData: DATOs que se envian al servidor
     	   //agregar campos al objeto del FormDAtadatos.append('id_nodo',nombre_nodo);
     	   var datos = new FormData();
     	   datos.append('usuario',usuario);
     	   datos.append('password',password);
     	   datos.append('tipo',tipo);

     	   console.log(datos);
           
           //paso1: crear obejto AJAX
     	   var xhr = new XMLHttpRequest();
            //paso2: crear la conexion. 
     	   xhr.open('POST','inc/modelos/modelo-admin.php',true);
           
           //paso3: retorno de datos
           xhr.onload = function(){
           	if(this.status ===200 ){
           		var respuesta = JSON.parse(xhr.responseText);
           		// si la respuesta es correcta
           		console.log(respuesta);
              if (respuesta.respuesta==='correcto') {
               	// si es un nuevo usuario

               	  if (respuesta.tipo==='crear') {
               	  	swal({
               	  		title:'usuario Creado',
               	  		text:'Usuario se creó correctamente',
                        type:'success' 
               	  	    });
               	  	 
               	  }else if (respuesta.tipo==='login') {
               	  	 // REDIRECCIONAR al dashboard con .then(fuction=>{}); para swall
               	  	 swal({
               	  		title:'Login correcto',
               	  		text:'Presiona ok para abrir el Dashboard',
                        type:'success' 
               	  	    }).then(resultado =>{ 
               	  	    	// Lo que hara luego de dar ok en el alert de swall
               	  	    	console.log(resultado);

               	  	    	// PARA REDIRECCIONAR: window.location.href = 'direccion';

               	  	    	window.location.href='index.php';


               	  	    });
               	  }
               }else {
               	  	swal({
               	  		title:'ERROR',
               	  		text:'Hubo un ERROR',
                        type:'error' 
               	  	    });
               	  	
               	  } 


           	}
           }
             //enviar  el objeto FormData con los datos y xhr.send()
           xhr.send(datos);
     	
     }
}