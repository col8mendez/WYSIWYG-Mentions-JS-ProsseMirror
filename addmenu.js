document.addEventListener("DOMContentLoaded",function() {
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

   var editor = document.getElementById("dvEditor");
   var p = document.createElement("P");
   editor.appendChild(p);
})
})

