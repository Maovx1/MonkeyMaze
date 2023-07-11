function Jugador(laberinto, c, _tamañoCelda, alCompletar, sprite = null) {
  var ctx = c.getContext("2d");
  var dibujarSprite;
  var movimientos = 0;
  dibujarSprite = dibujarSpriteCírculo;
  if (sprite != null) {
    dibujarSprite = dibujarSpriteImg;
  }
  var jugador = this;
  var mapa = laberinto.mapa();
  var coordenadasCelda = {
    x: laberinto.coordenadaInicio().x,
    y: laberinto.coordenadaInicio().y
  };
  var tamañoCelda = _tamañoCelda;
  var mitadTamañoCelda = tamañoCelda / 2;

  // Método para redibujar el jugador con un nuevo tamaño de celda
  this.redibujarJugador = function (_tamañoCelda) {
    tamañoCelda = _tamañoCelda;
    dibujarSpriteImg(coordenadasCelda);
  };

  // Función para dibujar el jugador como un círculo
  function dibujarSpriteCírculo(coord) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(
      (coord.x + 1) * tamañoCelda - mitadTamañoCelda,
      (coord.y + 1) * tamañoCelda - mitadTamañoCelda,
      mitadTamañoCelda - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    if (
      coord.x === laberinto.coordenadaFin().x &&
      coord.y === laberinto.coordenadaFin().y
    ) {
      alCompletar(movimientos);
      jugador.desvincularEventosTeclado();
    }
  }

  // Función para dibujar el jugador usando un sprite
  function dibujarSpriteImg(coord) {
    var margenIzquierdo = tamañoCelda / 50;
    var margenDerecho = tamañoCelda / 25;
    ctx.drawImage(
      sprite,
      0,
      0,
      sprite.width,
      sprite.height,
      coord.x * tamañoCelda + margenIzquierdo,
      coord.y * tamañoCelda + margenIzquierdo,
      tamañoCelda - margenDerecho,
      tamañoCelda - margenDerecho
    );
    if (
      coord.x === laberinto.coordenadaFin().x &&
      coord.y === laberinto.coordenadaFin().y
    ) {
      alCompletar(movimientos);
      jugador.desvincularEventosTeclado();
    }
  }

  // Función para eliminar el sprite de una coordenada dada
  function eliminarSprite(coord) {
    var margenIzquierdo = tamañoCelda / 50;
    var margenDerecho = tamañoCelda / 25;
    ctx.clearRect(
      coord.x * tamañoCelda + margenIzquierdo,
      coord.y * tamañoCelda + margenIzquierdo,
      tamañoCelda - margenDerecho,
      tamañoCelda - margenDerecho
    );
  }

  // Función para comprobar la tecla presionada y mover al jugador en consecuencia
  function comprobarTecla(e) {
    var celda = mapa[coordenadasCelda.x][coordenadasCelda.y];
    movimientos++;
    switch (e.keyCode) {
      case 65:
      case 37: // oeste
        if (celda.w == true) {
          eliminarSprite(coordenadasCelda);
          coordenadasCelda = {
            x: coordenadasCelda.x - 1,
            y: coordenadasCelda.y
          };
          dibujarSprite(coordenadasCelda);
        }
        break;
      case 87:
      case 38: // norte
        if (celda.n == true) {
          eliminarSprite(coordenadasCelda);
          coordenadasCelda = {
            x: coordenadasCelda.x,
            y: coordenadasCelda.y - 1
          };
          dibujarSprite(coordenadasCelda);
        }
        break;
      case 68:
      case 39: // este
        if (celda.e == true) {
          eliminarSprite(coordenadasCelda);
          coordenadasCelda = {
            x: coordenadasCelda.x + 1,
            y: coordenadasCelda.y
          };
          dibujarSprite(coordenadasCelda);
        }
        break;
      case 83:
      case 40: // sur
        if (celda.s == true) {
          eliminarSprite(coordenadasCelda);
          coordenadasCelda = {
            x: coordenadasCelda.x,
            y: coordenadasCelda.y + 1
          };
          dibujarSprite(coordenadasCelda);
        }
        break;
    }
  }

  // Método para vincular los eventos del teclado
  this.vincularEventosTeclado = function () {
    window.addEventListener("keydown", comprobarTecla, false);

    $("#vista").swipe({
      swipe: function (
        direction,
      ) {
        console.log(direction);
        switch (direction) {
          case "up":
            comprobarTecla({
              keyCode: 38
            });
            break;
          case "down":
            comprobarTecla({
              keyCode: 40
            });
            break;
          case "left":
            comprobarTecla({
              keyCode: 37
            });
            break;
          case "right":
            comprobarTecla({
              keyCode: 39
            });
            break;
        }
      },
      threshold: 0
    });
  };

  // Método para desvincular los eventos del teclado
  this.desvincularEventosTeclado = function () {
    window.removeEventListener("keydown", comprobarTecla, false);
    $("#view").swipe("destroy");
  };

  // Dibujar el sprite del jugador en las coordenadas de inicio del laberinto
  dibujarSprite(laberinto.coordenadaInicio());

  // Vincular eventos del teclado
  this.vincularEventosTeclado();
}
