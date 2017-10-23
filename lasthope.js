/*Declaracion de variables para definir el tamaño de la tabla del juego*/ 
var alto = 15;
var ancho = 15;

/*Declaracion de variable para la creacion de la matriz donde se guardará la modificacion de la tabla*/
var copia = [,];

/*Declaracion de variables para los contadores de los ciclos*/
var a;
var b;

/*Declaracion de variable para contar cuantos checkbox vecinos estan seleccionados y se inicializa en 0 */
var checkboxVecinos = 0;

/*Se crea la memoria es decir donde se va a guardar la modificacion de la tabla*/
function crearMemoria() {
	for (a = 0; a < alto; a++) {
		copia[a] = [];
		for (b = 0; b < ancho; b++) {
			copia[a][b] = false;
		}
	}
}

/** Se muestra la tabla creada con elemetos checkbox en el lugar indicado del documento(html)*/
function mostrarTabla() {
	/**Busca en el docuemento el id tabla y borra todo los que haya en ese id */
	document.getElementById('tabla').innerHTML = '';
/**Es un ciclo anidado con el cual se va a mostrar la tabla con los checkbox */
	for (a = 0; a < alto; a++) {
		for (b = 0; b < ancho; b++) {
			/**En el documento donde esta el id tabla esta poniendo cada uno de los checkbox */
			document.getElementById('tabla').innerHTML += '<input type="checkbox" class="checkbox" id="'+b+'.'+a+'">';
		}
		/**Se le esta dando un salto de linea para darle formato a la tabla */
		document.getElementById('tabla').innerHTML += '<br>';
	}
}

/**Actualizar la tabla aplicando las reglas del juego */
function actualizarTabla() {

	for (a = 0; a < alto; a++) {
		for (b = 0; b < ancho; b++) {
			checkboxVecinos = 0;

			/**Comprobar si existen los checkbox vecinos y si estan seleccionados para saber cuantos vecinos estan "vivos" */
			if (document.getElementById((a-1)+'.'+(b-1))&&document.getElementById((a-1)+'.'+(b-1)).checked===true) {
				checkboxVecinos+=1;
			}
			if (document.getElementById((a-1)+'.'+(b))&&document.getElementById((a-1)+'.'+(b)).checked===true) {
				checkboxVecinos+=1;
			}
			if (document.getElementById((a-1)+'.'+(b+1))&&document.getElementById((a-1)+'.'+(b+1)).checked===true) {
				checkboxVecinos+=1;
			}

			if (document.getElementById((a)+'.'+(b-1))&&document.getElementById((a)+'.'+(b-1)).checked===true) {
				checkboxVecinos+=1;
			}
			if (document.getElementById((a)+'.'+(b+1))&&document.getElementById((a)+'.'+(b+1)).checked===true) {
				checkboxVecinos+=1;
			}

			if (document.getElementById((a+1)+'.'+(b-1))&&document.getElementById((a+1)+'.'+(b-1)).checked===true) {
				checkboxVecinos+=1;
			}
			if (document.getElementById((a+1)+'.'+(b))&&document.getElementById((a+1)+'.'+(b)).checked===true) {
				checkboxVecinos+=1;
			}
			if (document.getElementById((a+1)+'.'+(b+1))&&document.getElementById((a+1)+'.'+(b+1)).checked===true) {
				checkboxVecinos+=1;
			}

			/**Segun el numero de vecinos "vivos" se aplican las reglas del juego para establecer el valor de la siguiente generacion
			 * del checkbox evaluado.
			 */
			switch(checkboxVecinos){
				case 2:
					copia[a][b] = document.getElementById(a+'.'+b).checked;
					break;
				case 3:
					copia[a][b] = true;
					break;
				default:
					copia[a][b] = false;
					break;
			}
		}
	}

	/**Segun los valores almacenados en la memoria se modifican los valores de la tabla para visualizar la actualizacion */
	for (a = 0; a < alto; a++) {
		for (b = 0; b < ancho; b++) {
			document.getElementById(a+'.'+b).checked = copia[a][b];
		}
	}

}

/**Establecer de manera aleatoria el estado inicial de la tabla */
function llenar() {
	for (a = 0; a < alto; a++) {
		for (b = 0; b < ancho; b++) {

			document.getElementById(a+'.'+b).checked = Math.round(Math.random());
		}
	}
}


/*
function jugar() {
	setInterval(actualizarTabla(),1000);
	jugar();
}*/

/**Al momento de cargar el archivo de javaScript se va a inicializar la memoria */
crearMemoria();
/**Esta funcion se va a ejecutar una sola vez al cargar el archivo de javaScript ya que solo se necesita modificar
 * la propiedad "checked" de los checkbox
 */
mostrarTabla();