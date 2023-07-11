
function Laberinto(Ancho, Alto) {
  var mapaLaberinto; // Representa el mapa del laberinto
  var ancho = Ancho; // Ancho del laberinto
  var alto = Alto; // Alto del laberinto
  var coordenadaInicio, coordenadaFin; // Coordenadas de inicio y fin del laberinto
  var direcciones = ["n", "s", "e", "w"]; // Direcciones posibles: norte, sur, este, oeste
  var modDir = { // Mapeo de direcciones con modificadores de coordenadas
    n: { y: -1, x: 0, o: "s" },
    s: { y: 1, x: 0, o: "n" },
    e: { y: 0, x: 1, o: "w" },
    w: { y: 0, x: -1, o: "e" }
  };

  // Método para obtener el mapa del laberinto
  this.mapa = function() {
    return mapaLaberinto;
  };

  // Método para obtener las coordenadas de inicio del laberinto
  this.coordenadaInicio = function() {
    return coordenadaInicio;
  };

  // Método para obtener las coordenadas de fin del laberinto
  this.coordenadaFin = function() {
    return coordenadaFin;
  };

  // Función para generar el mapa del laberinto
  function generarMapa() {
    mapaLaberinto = new Array(alto);
    for (var y = 0; y < alto; y++) {
      mapaLaberinto[y] = new Array(ancho);
      for (var x = 0; x < ancho; ++x) {
        mapaLaberinto[y][x] = {
          n: false,
          s: false,
          e: false,
          w: false,
          visitado: false,
          posicionAnterior: null
        };
      }
    }
  }

  // Función para definir el laberinto
  function definirLaberinto() {
    var completado = false;
    var movimiento = false;
    var celdasVisitadas = 1;
    var numVueltas = 0;
    var maxVueltas = 0;
    var posicion = { x: 0, y: 0 };
    var numCeldas = ancho * alto;
    while (!completado) {
      movimiento = false;
      mapaLaberinto[posicion.x][posicion.y].visitado = true;

      if (numVueltas >= maxVueltas) {
        revolver(direcciones);
        maxVueltas = Math.round(aleatorio(alto / 8));
        numVueltas = 0;
      }
      numVueltas++;
      for (var indice = 0; indice < direcciones.length; indice++) {
        var direccion = direcciones[indice];
        var nx = posicion.x + modDir[direccion].x;
        var ny = posicion.y + modDir[direccion].y;

        if (nx >= 0 && nx < ancho && ny >= 0 && ny < alto) {
          // Verificar si la casilla ya fue visitada
          if (!mapaLaberinto[nx][ny].visitado) {
            // Romper las paredes entre la casilla actual y la siguiente
            mapaLaberinto[posicion.x][posicion.y][direccion] = true;
            mapaLaberinto[nx][ny][modDir[direccion].o] = true;

            // Establecer la casilla actual como la posición anterior de la siguiente casilla
            mapaLaberinto[nx][ny].posicionAnterior = posicion;
            // Actualizar la posición de la celda a la ubicación recién visitada
            posicion = { x: nx, y: ny };
            celdasVisitadas++;
            // Llamar recursivamente a este método en la siguiente casilla
            movimiento = true;
            break;
          }
        }
      }

      if (!movimiento) {
        // Si no se encontró una dirección válida para moverse,
        // regresar a la celda anterior y llamar nuevamente al método.
        posicion = mapaLaberinto[posicion.x][posicion.y].posicionAnterior;
      }
      if (numCeldas == celdasVisitadas) {
        completado = true;
      }
    }
  }

  // Función para definir las coordenadas de inicio y fin del laberinto
  function definirInicioFin() {
    switch (aleatorio(4)) {
      case 0:
        coordenadaInicio = { x: 0, y: 0 };
        coordenadaFin = { x: alto - 1, y: ancho - 1 };
        break;
      case 1:
        coordenadaInicio = { x: 0, y: ancho - 1 };
        coordenadaFin = { x: alto - 1, y: 0 };
        break;
      case 2:
        coordenadaInicio = { x: alto - 1, y: 0 };
        coordenadaFin = { x: 0, y: ancho - 1 };
        break;
      case 3:
        coordenadaInicio = { x: alto - 1, y: ancho - 1 };
        coordenadaFin = { x: 0, y: 0 };
        break;
    }
  }

  // Llamada a las funciones para generar el mapa, definir el laberinto y las coordenadas de inicio y fin
  generarMapa();
  definirInicioFin();
  definirLaberinto();
}
