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
   // imagenSeparador.id="img";
   imagenSeparador.src = "img/FIN_PAGINA.png";
   imagenSeparador.style.width = "20px";
   imagenSeparador.alt="Fin de la pagina";
   // imagenSeparador.classList.add("ProseMirror-separator");
   dveditor.appendChild(imagenSeparador);
   dveditor.innerHTML = dveditor.innerHTML + '<P>';


   var ultimoParrafo = dveditor.lastElementChild;
   // console.log(ultimoParrafo);
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

})//Fin evento Click en boton nueva pagina

editor.addEventListener("keyup",function(eventoKey){
   LimpiarNodoFinPagina();
})
editor.addEventListener("click",function(evento){

   // evento.stopPropagation();
   // evento.preventDefault();
   for(var i = 0; i < evento.target.childNodes.length; i ++)
   {
      if(evento.target.childNodes[i].localName == "img" && evento.target.childNodes[i].alt == "Fin de la pagina")
      {
         var siguienteParrafo = (evento.target.nextSibling);
         console.log(siguienteParrafo);
         var seleccion = window.getSelection();
         var rango = document.createRange();
         if(siguienteParrafo != null) //si esto es nulo es porque no existe siguiente parrafo
         {
            rango.selectNodeContents(siguienteParrafo);
            rango.collapse(false);
            seleccion.removeAllRanges();
            seleccion.addRange(rango);
         }
         else
         {
            var editor = document.getElementById("dvEditor");
            editor.innerHTML = editor.innerHTML + "<P></P>";
         }
      }
   }
   
   // LimpiarNodoFinPagina(evento);
   // 
})

function LimpiarNodoFinPagina()
{
   var editorLimpiar = document.getElementById("dvEditor");
   for(var i = 0; i < editorLimpiar.childNodes.length; i ++)
   {
      if(editorLimpiar.childNodes[i].localName == "p")
      {
         var nodoDiv = editorLimpiar.childNodes[i];
         for(var j = 0; j < nodoDiv.childNodes.length; j++)
         {
            if(nodoDiv.childNodes[j].localName == "img" && nodoDiv.childNodes[j].alt == "Fin de la pagina")
            {
               for (var k= 0; k < nodoDiv.childNodes.length; k++)
               {
                  if(nodoDiv.childNodes[k].localName != "br" && nodoDiv.childNodes[k].alt != "Fin de la pagina" )
                     nodoDiv.removeChild(nodoDiv.childNodes[k]);
                  // evento.target.removeChild(evento.target.childNodes[i]);
               }
               break;
               //nos movemos al siguiente parrafo
               // evento.target.contenEditable = false;
            }
         }
      }
   }
}
}
)