
// Funcion para mostrar el mensaje de victoria e informacion extra
function mensajeVictoria(moves) {
  detenerContador(); // Detener el contador de tiempo
  document.getElementById("moves").innerHTML = "Hiciste " + moves + " movimientos.";
  visibilidad_mensaje("Message-Container");
}
// Manejo de los estados de la visivilidad del mensaje
function visibilidad_mensaje(id) {
  if (document.getElementById(id).style.visibility == "visible") {
    document.getElementById(id).style.visibility = "hidden";
  } else {
    document.getElementById(id).style.visibility = "visible";
  }
}

// Variables para el diseño del laberinto
var lienzoLaberinto = document.getElementById("mazeCanvas");
var ctx = lienzoLaberinto.getContext("2d");
var sprite;
var spriteFin;
var laberinto, dibujo, jugador;
var tamañoCelda;
var dificultad;

window.onload = function () {
  // Dimensiones del contenedor
  let anchoVista = $("#view").width();
  let altoVista = $("#view").height();
  // Ajustar el tamaño del lienzo segun el contenedor de view
  if (altoVista < anchoVista) {
    ctx.canvas.width = altoVista - altoVista / 100;
    ctx.canvas.height = altoVista - altoVista / 100;
  } else {
    ctx.canvas.width = anchoVista - anchoVista / 100;
    ctx.canvas.height = anchoVista - anchoVista / 100;
  }

  // Cargar y editar sprites
  // Comprobacion de funcionamento del proyecto
  var completoUno = false;
  var completoDos = false;
  var estaCompleto = () => {
    if (completoUno === true && completoDos === true) {
      console.log("Ejecuta");
      setTimeout(function () {
        crearLaberinto();
      }, 500);
    }
  };
  sprite = new Image();
  sprite.src =
    "https://static.vecteezy.com/system/resources/previews/019/045/905/original/monkey-graphic-clipart-design-free-png.png" +
    "?" +
    new Date().getTime();
  sprite.setAttribute("crossOrigin", " ");
  sprite.onload = function () {
    sprite = cambiar_brillo(1.2, sprite);
    completoUno = true;
    console.log(completoUno);
    estaCompleto();
  };

  spriteFin = new Image();
  spriteFin.src = "https://static.vecteezy.com/system/resources/previews/019/045/905/original/monkey-graphic-clipart-design-free-png.png" +
    "?" +
    new Date().getTime();
  spriteFin.setAttribute("crossOrigin", " ");
  spriteFin.onload = function () {
    spriteFin = cambiar_brillo(1.1, spriteFin);
    completoDos = true;
    console.log(completoDos);
    estaCompleto();
  };
};

window.onresize = function () {
  // Obtener las dimensiones del contenedor de vista
  let anchoVista = $("#view").width();
  let altoVista = $("#view").height();
  // Ajustar el tamaño del lienzo
  if (altoVista < anchoVista) {
    ctx.canvas.width = altoVista - altoVista / 100;
    ctx.canvas.height = altoVista - altoVista / 100;
  } else {
    ctx.canvas.width = anchoVista - anchoVista / 100;
    ctx.canvas.height = anchoVista - anchoVista / 100;
  }
  // Calculo del tamaño de la celda en funcion del ancho dedl lienzo y la dificultad
  tamañoCelda = lienzoLaberinto.width / dificultad;
  // Volver a dibujar el laberinto y el jugador con el nuevo tamaño de celda
  if (jugador != null) {
    dibujo.redibujarLaberinto(tamañoCelda);
    jugador.redibujarJugador(tamañoCelda);
  }
};

var tiempoInicio; // Variable para almacenar el tiempo de inicio
var intervaloTiempo; // Variable para almacenar el identificador del intervalo de tiempo

function iniciarContador() {
  tiempoInicio = Date.now(); // Guarda el tiempo de inicio actual
  intervaloTiempo = setInterval(actualizarTiempo, 1000); // Actualiza el tiempo cada segundo (1000 milisegundos)
}

function detenerContador() {
  clearInterval(intervaloTiempo); // Detiene el intervalo de tiempo
}

function actualizarTiempo() {
  var tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000); // Calcula el tiempo transcurrido en segundos
  document.getElementById("time").innerHTML = "Tiempo: " + tiempoTranscurrido + "s"; // Actualiza el elemento HTML con el tiempo transcurrido
}

function crearLaberinto() {
  // Si ya existe un jugador, desvincular eventos de teclado y eliminarlo
  if (jugador != undefined) {
    jugador.desvincularEventosTeclado();
    jugador = null;
  }
  // Obtener el nivel de dificultad seleccionado por el usuario
  var e = document.getElementById("diffSelect");
  dificultad = e.options[e.selectedIndex].value;
  // Calcular el tamaño de la celda en función del ancho del lienzo y la dificultad del laberinto
  tamañoCelda = lienzoLaberinto.width / dificultad;
  // Crear un nuevo laberinto, dibujarlo en el lienzo y crear un nuevo jugador
  laberinto = new Laberinto(dificultad, dificultad);
  dibujo = new DibujarLaberinto(laberinto, ctx, tamañoCelda, spriteFin);
  jugador = new Jugador(laberinto, lienzoLaberinto, tamañoCelda, mensajeVictoria, sprite);
  // Ajustar la opacidad del contenedor del laberinto a 100%
  if (document.getElementById("mazeContainer").style.opacity < "100") {
    document.getElementById("mazeContainer").style.opacity = "100";
  }

  iniciarContador(); // Iniciar el contador de tiempo
}

