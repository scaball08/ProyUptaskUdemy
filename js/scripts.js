eventListeners();

// variables GLOBALES

var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){
	//boton para crear proyecto
  document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

}

function nuevoProyecto(e){
	e.preventDefault();

	console.log('Presionaste Nuevo Proyecto');

	//Crear un <input> para el nombre del nuevo proyecto

	var nuevoProyecto = document.createElement('Li');

	nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);

    //Seleccionar el ID con el nuevo proyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    // Al presionar ENTER crear nuevo proyecto

       // evento al presionar una tecla con 'keypress'
    inputNuevoProyecto.addEventListener('keypress', function(e){
        // captar que tecla se presiono
      var tecla = e.keycode  || e.which;
      
     // El atributo keycode y el which  tiene el codigo de la tebla presionada
      if (tecla===13) {
      	guardarProyectoDB(inputNuevoProyecto.value);
      	listaProyectos.removeChild(nuevoProyecto);
      } 

    });
    
}


function guardarProyectoDB(nombreProyecto){
  

  //  CREAR LLAMADO llamado AJAX
  var xhr =  new XMLHttpRequest();

  //enviar datos por FORMDATA
  datos  =  new FormData();
  datos.append('proyecto',nombreProyecto);
  datos.append('tipo','crear');


  // ABRIR LA CONEXION
  xhr.open('POST','inc/modelos/modelo-proyecto.php',true);
 
 // en la carga
 xhr.onload = function (){

 	if(this.status ===200){

 		//obtener Respuesta
 		var respuesta = JSON.parse(xhr.responseText);

 		var proyecto = respuesta.nombre_proyecto,
 		id_proyecto  =  respuesta.id_proyecto,
 		tipo = respuesta.tipo,
 		resultado = respuesta.respuesta;
        
        //comprobar insercion 
 		if (resultado === 'correcto') {
          // fue exitoso

          var nuevoProyecto = document.createElement('Li');
          nuevoProyecto.innerHTML = `
                <a href ="index.php?id_respuesta=${id_proyecto}" id="${id_proyecto}" > 
                 ${proyecto}
                </a>`;

           listaProyectos.appendChild(nuevoProyecto);     
           
           // enviar alerta

           swal({
       	  		title:'Proyecto Creado',
       	  		text:'El proyecto '+ proyecto +' se creó correctamente',
                type:'success' 
       	  	    }); 

          if (tipo === 'crear') {
          	// se creo un nuevo proyecto


          } else {
          	//Se actualizo

          }


 		}else {
 			// hubo un error

 			swal({
       	  		title:'ERROR',
       	  		text:'Hubo un error',
                type:'error' 
       	  	    });

 		}

 	}

 }

// enviar REQUEST
xhr.send(datos);

}