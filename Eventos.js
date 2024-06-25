const TMfuente = [
    [1, "1pt"],
    [2, "2pt"],
    [3, "3pt"],
    [4, "4pt"],
    [5, "5pt"],
    [6, "6pt"],
    [7, "7pt"],
    [8, "8pt"],
    [9, "9pt"],
    [10, "10pt"],
    [11, "11pt"],
    [12, "12pt"],
    [13, "13pt"],
    [14, "14pt"],
    [15, "15pt"],
    [16, "16pt"],
    [17, "17pt"],
    [18, "18pt"],
    [19, "19pt"],
    [20, "20pt"],
  ];
  
 

document.addEventListener("DOMContentLoaded", () => {
    let editor = document.getElementById("dvEditor");

    function asignacionfuentes()
    {
    //asignandole valor por default para tamaño de fuente y tipo de fuente esto se asigna desde estilomenu.css
    document.getElementById("TMFuente").innerText = "12";
    document.getElementById("TFuente").innerText = "Times New Roman";
    }
      

    editor.addEventListener("click", (evento) =>{
        evento.target.style.length > 0 ?  obtenerEstilos(evento, evento.target.style) : asignacionfuentes(); 
         //function en addmenu.js
        // obtenerEstilos(evento, estilos);

    })
    
   function obtenerEstilos(evento, estilos)
    {        
        if(estilos.length > 0)
            {
                let tmfuente = 0;
                let tfuente = 0;
                for (let i = 0; i < estilos.length; i++)
                    {                     
                        switch(estilos[i])
                        {
                            case 'font-size':
                                try{
                                    tmfuente = (estilos.fontSize).replace(".0", "");
                                    document.getElementById("TMFuente").innerText = (TMfuente.find(array => array[1].replace(".0", '') === tmfuente))[0]; //buscamos el equivalente del tamaño de fuente [0] ya que es un array y quiero que pinte nada mas el numero
                                    // setTMFuente(tfuente.replace("pt",""));
                                }
                                catch{
                                    document.getElementById("TMFuente").innerText = "Tamaño de fuente"
                                }
                            break;
                            case 'font-family':
                                try{
                                    tfuente = (estilos.fontFamily).replace(/"/g, '');
                                    document.getElementById("TFuente").innerText = tfuente;
                                }
                                catch
                                {
                                    document.getElementById("TFuente").innerText = "Tipo de fuente"
                                }
                                break;                            
                        }
                  


                    }  //fin for
                    if(tmfuente == 0)
                        document.getElementById("TMFuente").innerText = "12" //por default usa este tamaño
                    if(tfuente == 0)
                        document.getElementById("TFuente").innerText = "Time New Roman";                                          
            } //fin if
        // let padreObjeto = evento.srcElement.parentElement;
        // if(padreObjeto.localName == "strong" || padreObjeto.localName == "em")
        //     {
        //         let parentp = evento.srcElement.parentElement;
        //         let nodesP = parentp.childNodes;
                
        //         if(padreObjeto.localName == "strong")
        //         {
        //                 let btnnegrita = document.getElementById("idmenu");
        //                 btnnegrita.childNodes[4].childNodes[0].classList[0].replace("ProseMirror-icon", "ProseMirror-icon ProseMirror-menu-active");
        //         }
                
        //     }
        
    }
    // function setTMFuente (tmfuente) //aun falta funcionalidad
    // {
    //     let dveditor = document.getElementById("dvEditor");
    //     let TmFuenteDiv = document.getElementById("TMFuente");

    //     const eventoMouseUp = new MouseEvent('mouseup',{
    //         view: window,
    //         bubbles: true,
    //         cancelable: true
    //     });

    //     const eventoMouseUp2 = new MouseEvent('mouseup',{
    //         view: window,
    //         bubbles: true,
    //         cancelable: true
    //     });       

    //     TmFuenteDiv.dispatchEvent(eventoMouseUp);

    //     let dvdrpmenu = document.getElementById("dvdrpmenu").childNodes[tmfuente-1].childNodes[0];   
    //     dvdrpmenu.classList.add("ProseMirror-menu-active");
    //     dvdrpmenu.dispatchEvent(eventoMouseUp2);

    //     dveditor.click();
        
    // }

})