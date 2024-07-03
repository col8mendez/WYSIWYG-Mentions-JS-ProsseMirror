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
        let eventParent = evento.target.parentNode;
        evento.target.style.length > 0 ?  obtenerEstilos(evento, evento.target.style, eventParent.style) : asignacionfuentes(); 
    })
    
    // editor.addEventListener("selectionchange",validaTextoSeleccion);

   function obtenerEstilos(evento, estilo1, estilo2)
    {        
        let estilos = [estilo1,estilo2];

        if(estilos.length > 0)
            {
                let tmfuente = 0;
                let tfuente = 0;
                for (let i = 0; i < estilos.length; i++)
                    {                     
                        switch(estilos[i][0])
                        {
                            case 'font-size':
                                try{
                                    tmfuente = (estilos[i].fontSize).replace(".0", "");
                                    document.getElementById("TMFuente").innerText = (TMfuente.find(array => array[1].replace(".0", '') === tmfuente))[0]; //buscamos el equivalente del tamaño de fuente [0] ya que es un array y quiero que pinte nada mas el numero
                                    // setTMFuente(tfuente.replace("pt",""));
                                }
                                catch{
                                    document.getElementById("TMFuente").innerText = "Tamaño de fuente"
                                }
                            break;
                            case 'font-family':
                                try{
                                    tfuente = (estilos[i].fontFamily).replace(/"/g, '');
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
    }


    // function validaTextoSeleccion(){
    //     let seleccion = window.getSelection();
    //     console.log(seleccion);
    // }
    // let parser = new DOMParser();
    // let htmlstring = '<p><span style="font-size: 10.5px;">YO MARGARITA LIMA VASQUEZ</span></p><p><span style="font-size: 10.5px;">Me identifico con Documento Personal de Identificación (DPI), con Código Único de Identificación (CUI) número:  1713582361701</span></p><p><span style="font-size: 10.5px;">Extendido por el Registro Nacional de las Personas (RENAP). En adelante me dominare simple e indistintamente la “parte deudora” y/o “librador”, y señalo como lugar para recibir comunicaciones y/o notificaciones que para efectos de este título será domicilio especial, el siguiente: ZONA 0, COLONIA , CALLE PRINCIPAL EL PLANTEL, LA LIBERTAD, PETEN, GUATEMALA</span></p><p><span style="font-size: 10.5px;">Manifiesto que por el presente PAGARÉ libre de protesto, prometo pagar incondicionalmente a la orden o endoso de BANCO INDUSTRIAL, SOCIEDAD ANÓNIMA, en adelante llamado “Banco”, y/o “Acreedor”, y/o “Beneficiario”, la suma total de: Q.50.000,00 de la cual me declaro liso y llano deudor y declaro utilizaré este financiamiento única y exclusivamente para capital de trabajo. El pago de la referida suma lo haré bajo los siguientes términos:</span></p><p><strong><span style="font-size: 10.5px;">A) DEL PLAZO Y FORMA DE PAGO:</span></strong></p><p><span style="font-size: 10.5px;">Me obligo a pagar la referida suma de este título en el plazo de 19 meses a contar de la presente fecha, cantidad que pagaré sin necesidad de previo cobro o requerimiento, mediante el pago de DIECIOCHO (18)es  amortizaciones mensuales y sucesivas de 3.517,00 cada una, que se harán efectivas el día 05 DE JULIO DE 2024 hábil bancario de cada mes calendario o el inmediato anterior si ese día fuere inhábil bancario, iniciando a partir del mes calendario siguiente a la presente fecha y un último pago al vencimiento del plazo de 3.519,45 Todo pago lo haré en las oficinas centrales de Banco situadas en séptima avenida cinco guion diez de la zona cuatro de la ciudad de Guatemala, o en cualesquiera de sus agencias y/o sucursales ubicadas en la República de Guatemala, lugares que conozco plenamente.</span></p><p><strong><span style="font-size: 10.5px;">B) INTERESES:</span></strong></p><p><span style="font-size: 10.5px;">Sobre la suma o cantidad total que he prometido incondicionalmente pagar, reconozco que se incluye un cargo total de intereses convencionales y efectivos, calculados bajo la tasa de: VEINTE POR CIENTO (20%). Dicha tasa de Interés será MICRO FINANZAS FLAT pactada convencionalmente entre acreedor y deudor, consistente en multiplicar la tasa indicada por el plazo y por el monto del crédito, cuyo resultado se le suma al monto del crédito y se divide entre el plazo. En virtud que la tasa de interés es variable y establecida por el Consejo de Administración del Banco, me obligo al pago de la nueva tasa desde la fecha en que cobre vigencia la disposición administrativa del Banco, para aumentarla o reducirla, para lo cual me obligo a estar en constante comunicación con el Banco. Los intereses los liquidaré y pagaré mensualmente junto a las amortizaciones a capital.</span></p><p><strong><span style="font-size: 10.5px;">C) ACEPTACION Y OBLIGACION DE LA PARTE DEUDORA:</span></strong></p><p><span style="font-size: 10.5px;">a. Acepto que el Banco podrá dar por vencido el plazo de este título en forma anticipada y exigir ejecutivamente el pago total del saldo adeudado tanto de capital como cuota de intereses, en los siguientes casos:</span></p><p><span style="font-size: 10.5px;">a.1) Si no cumplo cualquiera de las obligaciones aquí contraídas y las que establece la Ley de Bancos y Grupos Financieros, ya que el    régimen especial de la misma lo acepto aquí incorporado;</span></p><p><span style="font-size: 10.5px;">a.2) Si se dictare mandamiento de embargo en mi contra y/o avalista si lo hubiese (s);</span></p><p><span style="font-size: 10.5px;">a.3) Si dejare de pagar puntualmente una sola de las cuotas convenidas; y</span></p><p><span style="font-size: 10.5px;">a.4) Si el Banco comprobare que utilicé el financiamiento para fines distintos a lo antes mencionado.</span></p><p><span style="font-size: 10.5px;">b. </span><strong><span style="font-size: 10.5px;">Renuncio al fuero de mi respectivo domicilio; me someto y sujeto a la jurisdicción y Tribunales que elija el Banco; </span></strong><span style="font-size: 10.5px;">y que el Banco pueda utilizar, a su elección y para el caso de ejecución el procedimiento de la Ley de Bancos y Grupos Financieros, y/o el Código Procesal Civil y Mercantil y/o Código de Comercio, así como para señalar los bienes objeto de embargo, secuestro, depósito e intervención, sin sujetarse a orden legal alguno.</span></p><p><span style="font-size: 10.5px;">c. Acepto como buenas y exactas las cuentas que el Banco formule acerca de este título y como líquido, exigible y de plazo vencido la cantidad que se exija.</span></p><p><span style="font-size: 10.5px;">d. Acepto que se tengan como válidas y bien hechas legalmente las comunicaciones y/o notificaciones que se realicen y/o dirijan al lugar indicado como domicilio especial, a no ser que comunique y/o notifique por escrito al Banco, de cualquier cambio en la misma y que obre en su poder aviso de recepción del Banco.</span></p><p><span style="font-size: 10.5px;">e. Acepto y reconozco que la suma que he prometido pagar incondicionalmente es por el plazo total pactado; si por cualquier razón quisiere pagarlo anticipadamente, acepto que debe incluirse el pago de la totalidad de las cuotas establecidas incluyéndose capital e intereses pactados.</span></p><p><span style="font-size: 10.5px;">f. Acepto que todo gasto por cobranza es por mi cuenta; y acepto el cobro por concepto de “gastos administrativos por desembolso” del  POR CIENTO (2000%) sobre el monto total otorgado, el cual será debitado o restado de la cantidad que me sea depositada o entregada al momento del desembolso del financiamiento otorgado y también acepto el cobro por gastos administrativos generales que el Banco disponga, los cuales serán cargados mensualmente junto a las amortizaciones mensuales.</span></p>';

    // let htmlstring = '<p>Cristóbal Colón (Cristoforo Colombo, en italiano, o Christophorus Columbus, en latín; de orígenes discutidos, los expertos se inclinan por Génova, República de Génovan. 1​3​4​ donde pudo haber nacido el 31 de octubre de 14515​ y se sabe que murió en Valladolid el 20 de mayo de 1506) fue un navegante, cartógrafo, almirante, virrey y gobernador general de las Indias Occidentales al servicio de la Corona de Castilla. Realizó el llamado descubrimiento de América el 12 de octubre de 1492, al llegar a la isla de Guanahani, en las Bahamas. Efectuó cuatro viajes a las Indias —denominación inicial del continente americano — y aunque posiblemente no fue el primer explorador europeo de América, se le considera el descubridor de un nuevo continente —por eso llamado el Nuevo Mundo— para Europa, al ser el primero que trazó una ruta de ida y vuelta a través del océano Atlántico y dio a conocer la noticia. Este hecho impulsó decisivamente la expansión mundial de la civilización europea, así como la conquista y colonización por varias de sus potencias del continente americano. No se sabe con certeza hasta qué punto era consciente de que América era una masa de tierra totalmente separada; nunca renunció claramente a su creencia de que había llegado al Extremo Oriente. Como gobernador colonial, Colón fue acusado por sus contemporáneos de una importante brutalidad y pronto fue destituido del cargo. Durante su gobierno en La Española, los taínos, un pueblo que fue diezmado y dejado de contabilizar en los censos de la época pero del cual se conservan descendientes,6​7​ fueron objeto de un impuesto,8​ repartidos entre los colonos9​ y vendidos como esclavos.10​11​ Algunos historiadores han negado las acusaciones de genocidio realizadas contra él por otros.12​13​ Las tensas relaciones de Colón con la Corona de Castilla y sus administradores coloniales designados en América condujeron a su arresto y expulsión de La Española en 1500, y posteriormente a un prolongado litigio sobre los beneficios que él y sus herederos reclamaban que les debía la corona.Su antropónimo es un ícono mundial que inspiró diversas denominaciones, como la de un país: Colombia,14​ y dos regiones de Norteamérica: la Columbia Británica, en Canadá, y el Distrito de Columbia, en Estados Unidos. </p>';
    // let htmlstringParse = parser.parseFromString(htmlstring,'text/html');
    // actualizarvista(htmlstring);
    //  htmlstring = htmlstring.replace(/.5px;/g, "pt;");
    //  htmlstring = htmlstring.replace(/.0px;/g, "pt;");
    // htmlstring = htmlstring.replace(/<p>/g, "");
    // htmlstring = htmlstring.replace(/<\/p>/g, "");
    // document.getElementById("dvEditor").innerHTML =  htmlstring + "<p>";
    // cargaHTMLPlantilla(htmlstring);
    
})