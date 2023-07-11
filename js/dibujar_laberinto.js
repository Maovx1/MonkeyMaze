function DibujarLaberinto(laberinto, ctx, tamañoCelda, spriteFinal = null) {
  var mapa = laberinto.mapa();
  var tamañoCelda = tamañoCelda;
  var métodoDibujarFinal;
  ctx.lineWidth = tamañoCelda / 40;

  this.redibujarLaberinto = function (tamaño) {
    tamañoCelda = tamaño;
    ctx.lineWidth = tamañoCelda / 50;
    dibujarMapa();
    métodoDibujarFinal();
  };

  function dibujarCelda(xCord, yCord, celda) {
    var x = xCord * tamañoCelda;
    var y = yCord * tamañoCelda;

    if (celda.n == false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + tamañoCelda, y);
      ctx.stroke();
    }
    if (celda.s === false) {
      ctx.beginPath();
      ctx.moveTo(x, y + tamañoCelda);
      ctx.lineTo(x + tamañoCelda, y + tamañoCelda);
      ctx.stroke();
    }
    if (celda.e === false) {
      ctx.beginPath();
      ctx.moveTo(x + tamañoCelda, y);
      ctx.lineTo(x + tamañoCelda, y + tamañoCelda);
      ctx.stroke();
    }
    if (celda.w === false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + tamañoCelda);
      ctx.stroke();
    }
  }

  function dibujarMapa() {
    for (x = 0; x < mapa.length; x++) {
      for (y = 0; y < mapa[x].length; y++) {
        dibujarCelda(x, y, mapa[x][y]);
      }
    }
  }

  function dibujarFinalBandera() {
    var coord = laberinto.coordenadaFin();
    var tamañoGrilla = 4;
    var fracción = tamañoCelda / tamañoGrilla - 2;
    var intercambioColor = true;
    for (let y = 0; y < tamañoGrilla; y++) {
      if (tamañoGrilla % 2 == 0) {
        intercambioColor = !intercambioColor;
      }
      for (let x = 0; x < tamañoGrilla; x++) {
        ctx.beginPath();
        ctx.rect(
          coord.x * tamañoCelda + x * fracción + 4.5,
          coord.y * tamañoCelda + y * fracción + 4.5,
          fracción,
          fracción
        );
        if (intercambioColor) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        }
        ctx.fill();
        intercambioColor = !intercambioColor;
      }
    }
  }

  function dibujarFinalSprite() {
    var margenIzquierdo = tamañoCelda / 50;
    var margenDerecho = tamañoCelda / 25;
    var coord = laberinto.coordenadaFin();
    ctx.drawImage(
      spriteFinal,
      2,
      2,
      spriteFinal.width,
      spriteFinal.height,
      coord.x * tamañoCelda + margenIzquierdo,
      coord.y * tamañoCelda + margenIzquierdo,
      tamañoCelda - margenDerecho,
      tamañoCelda - margenDerecho
    );
  }

  function limpiar() {
    var tamañoCanvas = tamañoCelda * mapa.length;
    ctx.clearRect(0, 0, tamañoCanvas, tamañoCanvas);
  }

  if (spriteFinal != null) {
    métodoDibujarFinal = dibujarFinalSprite;
  } else {
    métodoDibujarFinal = dibujarFinalBandera;
  }
  limpiar();
  dibujarMapa();
  métodoDibujarFinal();
}
