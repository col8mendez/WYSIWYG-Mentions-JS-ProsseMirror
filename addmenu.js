document.addEventListener("DOMContentLoaded",function() {
   var editor = document.getElementById("dvEditor");
   var padre = editor.parentElement;
   padre.id = "dvPrincipal";

   var menu = document.getElementById("idmenu");
   // console.log(menu);
   var nspan = document.createElement("span");
   nspan.classList.add("ProseMirror-menuitem");
    var nimg = document.createElement("img");
   nimg.id = "npagina";
   nimg.src = "img/nueva_pagina.png";
   nimg.style.width ="20px";
   nimg.classList.add("ProseMirror-icon");
   nimg.title = ("NuevaPagina");
   //  var nDiv = document.createElement("div");
   //  nDiv.id = "npagina"
   //  nDiv.classList.add("ProseMirror-icon");
   //  nDiv.title = ("NuevaPagina");
   //  var tdiv = document.createTextNode("N");
   //  nDiv.appendChild(tdiv);
    nspan.appendChild(nimg);
   //  nspan.appendChild(nDiv);
   menu.appendChild(nspan);

var npagina = document.getElementById("npagina");
npagina.addEventListener("click", function() {

   

   var dveditor = document.getElementById("dvEditor");
   var padre = document.getElementById("dvPrincipal");
   var imagenSeparador = document.createElement("img");
   imagenSeparador.id="img1";
   imagenSeparador.src = "img/FIN_PAGINA.png";
   imagenSeparador.style.width = "20px";
   imagenSeparador.alt="Fin de la página";
   imagenSeparador.classList.add("ProseMirror-separator");
   dveditor.appendChild(imagenSeparador);
   dveditor.innerHTML = dveditor.innerHTML + '<P>';

   var ultimoParrafo = dveditor.lastElementChild;
   console.log(ultimoParrafo);
   // Establece el foco en el último párrafo
   ultimoParrafo.focus();

   // Mueve el puntero al final del texto dentro del último párrafo
   var selection = window.getSelection();
   var range = document.createRange();
   range.selectNodeContents(ultimoParrafo);
   range.collapse(false); // Colapsa la selección al final del rango
   selection.removeAllRanges();
   selection.addRange(range);
   dveditor.focus();
   
})

})

