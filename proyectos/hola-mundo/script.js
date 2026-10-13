(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var boton = document.getElementById("boton-saludar");
    var mensaje = document.getElementById("mensaje");

    if (!boton || !mensaje) {
      return;
    }

    var saludos = [
      "¡Hola! Gracias por saludar.",
      "¡Hola de nuevo! Que tengas un gran día.",
      "¡Hola otra vez! Nos vemos por aquí.",
      "¡Hola! Este mensaje cambia cada vez que pulsas el botón."
    ];

    var indice = 0;

    boton.addEventListener("click", function () {
      mensaje.textContent = saludos[indice];
      indice = (indice + 1) % saludos.length;
    });
  });
})();