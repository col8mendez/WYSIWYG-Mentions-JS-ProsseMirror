// let savedSelectionRango;


 document.addEventListener("DOMContentLoaded", () => {

    function validateAndAddFirstParagraph() {
        const editorDiv = document.getElementById('dvEditor');
        const firstChild = editorDiv.firstChild;

        // Verifica si el primer hijo es un párrafo vacío
        if (!firstChild || firstChild.nodeName !== 'P' || firstChild.textContent.trim() !== '') {
            const emptyParagraph = document.createElement('p');
            emptyParagraph.innerHTML = '<br class="ProseMirror-trailingBreak">'; // Necesario para que el párrafo sea visible y editable
            editorDiv.insertBefore(emptyParagraph, editorDiv.firstChild);
        }
    }  

    function validateAndAddLastParagraph() {
        const editorDiv = document.getElementById('dvEditor');
        const lastChild = editorDiv.lastChild;

        // Verifica si el ultimo hijo es un párrafo vacío
        if (!lastChild || lastChild.nodeName !== 'P' || lastChild.textContent.trim() !== '') {
            const emptyParagraph = document.createElement('p');
            emptyParagraph.innerHTML = '<br class="ProseMirror-trailingBreak">'; // Necesario para que el párrafo sea visible y editable
            editorDiv.insertAfer(emptyParagraph, editorDiv.lastChild);
        }
    }  

    let editor = document.getElementById("dvEditor");
    editor.addEventListener("input", validateAndAddFirstParagraph);
    editor.addEventListener("blur", validateAndAddFirstParagraph);
    editor.addEventListener("keyup", validateAndAddFirstParagraph);
    editor.addEventListener("mouseup", validateAndAddFirstParagraph);

    validateAndAddFirstParagraph();
    validateAndAddLastParagraph();
});
//     const textContainer = document.getElementById('dvEditor');

// // textContainer.addEventListener('mouseup', saveSelection,true);
// // textContainer.addEventListener('keyup', saveSelection, true);
// // textContainer.addEventListener('blur', function(evento) {
// //     restoreSelection();
// // });

// // textContainer.addEventListener("focus", () => {
// //     restoreSelection();
// //  })

// });
// function saveSelection(){
//     const selection = window.getSelection();
//     if(savedSelectionRango !== selection)
//         {
//             // console.log("almacenando seleccion", selection.getRangeAt(0));
//             savedSelectionRango = selection.getRangeAt(0).cloneRange();            
//         }
// }

// function restoreSelection() {
//     if(savedSelectionRango !== undefined)
//         {          
//             const selection = window.getSelection();
//             selection.removeAllRanges();
//             selection.addRange(savedSelectionRango);                            
//         }
// }

function cargaHTMLPlantilla (html){
    html = html.replace(/.5px;/g, "pt;");
    html = html.replace(/.0px;/g, "pt;");
    document.getElementById("dvEditor").innerHTML =  "<p></p>" + html + "<p></p>";
}
