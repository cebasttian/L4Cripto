// ==UserScript==
// @name         FindKey
// @namespace    http://tampermonkey.net/
// @version      11.11
// @description  try to take over the world!
// @author       Cebasttian
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// ==/UserScript==

(function() {
    'use strict';
    var texto = document.body.innerText; // Obtener el texto del cuerpo del documento HTML
    var mayusculas = '';
    for (var i = 0; i < texto.length; i++) {
        var caracter = texto.charAt(i);
        if (caracter === caracter.toUpperCase() && caracter !== caracter.toLowerCase() && texto.charAt(i+1) === texto.charAt(i+1).toLowerCase() && texto.charAt(i+1) !== " "){
            mayusculas += caracter;
        }
    }
    console.log("La clave de cifrado es:",mayusculas); // Mostrar las mayúsculas en la consola del navegador
    var divs = document.getElementsByTagName('div'); // Obtener todos los elementos <div>
    var count = 0;
    for ( i = 0; i < divs.length; i++) {
        var classNames = divs[i].className.split(' '); // Obtener todas las clases del elemento <div>
        for (var j = 0; j < classNames.length; j++) {
            var className = classNames[j];
            if (className.charAt(0) === 'M') {
                count++;
                break; // Salir del bucle interno si se encuentra una clase que comienza con "M"
            }
        }
    }
    console.log('El numero de mensajes cifrados es:', count);
    var buffer = ''
    var clave = CryptoJS.enc.Utf8.parse(mayusculas);
    for ( i = 0; i < divs.length; i++) {
        classNames = divs[i].className.split(' '); // Obtener todas las clases del elemento <div>
        for (j = 0; j < classNames.length; j++) {
            className = classNames[j];
            if (className.charAt(0) === 'M') {
                var mb64 = CryptoJS.enc.Base64.parse(divs[i].id);
                var descifrado = CryptoJS.TripleDES.decrypt({ciphertext: mb64,},clave,{mode: CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7,});
                var coding = descifrado.toString(CryptoJS.enc.Utf8);
                if(i==1){
                    buffer += coding;
                }
                else{
                    buffer += ' ';
                    buffer += coding;
                }
                console.log(divs[i].id + ' ' + coding);
                break; // Salir del bucle interno si se encuentra una clase que comienza con "M"
            }
        }
    }
    var nuevoDiv = document.createElement("div");
    texto = document.createTextNode(buffer);
    nuevoDiv.appendChild(texto);
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(nuevoDiv);
})();