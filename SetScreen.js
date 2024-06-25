// Calcula el ancho de la hoja carta en píxeles
function calcularAnchoHoja() {
    var anchoPulgadas = 8.5; // Ancho de la hoja carta en pulgadas
    var anchoPantallaPuntos = window.screen.width;
    var altoPantallaPuntos = window.screen.height;
    var anchoPantallaPulgadas = anchoPantallaPuntos / window.devicePixelRatio / 96;
    var altoPantallaPulgadas = altoPantallaPuntos / window.devicePixelRatio / 96;
    var diagonalPulgadas = Math.sqrt(anchoPantallaPulgadas ** 2 + altoPantallaPulgadas ** 2);
    var resolucionPPI = diagonalPulgadas !== 0 ? Math.sqrt(anchoPantallaPuntos ** 2 + altoPantallaPuntos ** 2) / diagonalPulgadas : 96;
    var anchoEnPíxeles = Math.floor(anchoPulgadas * resolucionPPI);
    console.log("pulgadas:", anchoPulgadas);
    
    return anchoEnPíxeles;
  }

  // Establece el ancho de la hoja en blanco según la resolución
  function establecerAnchoHoja() {
    var hoja = document.getElementById('dvPrincipal');
    var anchoHoja = calcularAnchoHoja();
    hoja.style.width = anchoHoja + 'px';
  }

  // Llama a la función para establecer el ancho de la hoja al cargar la página
  window.onload = establecerAnchoHoja;

  // Llama a la función para establecer el ancho de la hoja cuando se redimensiona la ventana
  window.onresize = establecerAnchoHoja;