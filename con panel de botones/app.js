let romanField = document.getElementById("romanNumber");
var nume = document.querySelector("form > span");
var boter = document.querySelector("button");
const container = document.getElementById('only');
var hourTime = document.querySelector("span:first-of-type");
var dateHTML = document.getElementById('date');
var pos;
var ultimoIndice;

let romanNumerals = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

let regexDecimal = /^[0-9]*$/i;
let regexRoman = /^[IVXLCDM]*$/i;
var id;
var romanNumeral;
var numberType = "";
// Uso de la función

var digitSpace;
romanField.onkeydown = function(e) {
  if (/^[IVXLCDM0-9]*$/i.test(e.key)) {nume.style.display = "block"}
  const validKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
  if (!/^[IVXLCDM0-9]*$/i.test(e.key) && !validKeys.includes(e.key)) {e.preventDefault()};
  if (romanField.getAttribute('data-before') && regexDecimal.test(e.key)) {e.preventDefault()};
  digitSpace = (/^\d\s/).test(romanField.textContent);
};
var resultD;
romanField.addEventListener('input', function(e) {
  resultD = isCursorAtEndOfDiv(romanField)
  var posicion = window.getSelection().getRangeAt(0).startOffset;
  var selection = window.getSelection();
  // Obtener el nodo y la posición donde empieza la selección
  var node = selection.anchorNode;
  var offset = selection.anchorOffset;
  // Verificar si el nodo es un elemento de texto
  if (node.nodeType === Node.TEXT_NODE) {
    // Obtener el valor insertado en el "div" editable
    var valium = node.textContent[offset - 1];
};
  id = 'a';
  if (/^[0-9IVXLCDM ]*$/i.test(e.target.innerText)) {pos = window.getSelection().anchorOffset} 
  else {pos = window.getSelection().anchorOffset-1};

  var valor = e.target.innerText;

  if (!(regexRoman.test(valor) || regexDecimal.test(valor))) {
    romanField.innerHTML = valor.slice(0, posicion - 1) + valor.slice(posicion);
  };
    // Si es un número decimal, formatearlo
  if(!valor.match(/[IVXLCDM]/g)) {var num = valor.replace(/[^0-9]/g, "")};
    if (num) {
        e.target.innerText = formatNumber(num);
        moveCursorToPosition(pos);
        if(regexRoman.test(valium)){moveCursorToPosition(pos-1)}; 
        romanNumeral = decimalToRoman((romanField.innerText).replaceAll(' ',''));
        changelanguaje()
    }
    // Si es un número romano, dejarlo como está
    else {
        romanToDecimal(valor);
        moveCursorToPosition(pos);
        changelanguaje();
        tripleline = '';
        doubleline = '';
        overline = ''
    };
  if(/[0-9]/g.test(valor) && /[ivxlcdm]/g.test(valium) || /[IVXLCDM]/g.test(valor) && /[0-9]/g.test(valium)){moveCursorToPosition(pos-1)}
    del();
})

function formatNumber(n) {
  const numeroFormateado = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return numeroFormateado;
};

function isCursorAtEndOfDiv(div) {
  var sel = window.getSelection();
  if (sel.rangeCount > 0) {
    var selRange = sel.getRangeAt(0);
    var lastNode = div.lastChild;
    if (lastNode) { // Verificar si lastNode no es null
      var testRange = document.createRange();
      testRange.selectNodeContents(lastNode);
      testRange.setEnd(lastNode, lastNode.textContent.length);
      return testRange.compareBoundaryPoints(Range.END_TO_END, selRange) == 0;
    }
  }
  return false; // Retornar false si lastNode es null
}


let valorAnterior = romanField.innerText;
// Se añade un evento que se ejecute cuando el valor del campo cambie
romanField.addEventListener("input", function() {
  // Se obtiene el valor actual del campo
  let valorActual = romanField.innerText;
  // Se cuenta el número de espacios en el valor anterior y el valor actual
  let espaciosAnteriores = valorAnterior.split(" ").length - 1;
  let espaciosActuales = valorActual.split(" ").length - 1;
  // Se compara el número de espacios

  if (espaciosActuales > espaciosAnteriores) {
    // Se ha introducido un nuevo espacio
    moveCursorToPosition(window.getSelection().anchorOffset+1);
  } else if (digitSpace == true && event.inputType === "deleteContentBackward" && resultD == false) {
    moveCursorToPosition(window.getSelection().anchorOffset-1)
  }
  // Se actualiza el valor anterior
  valorAnterior = valorActual;
});

function moveCursorToPosition(position) {
  const selection = window.getSelection();
  const range = document.createRange();
  // Obtener la longitud del nodo de texto
  const textLength = romanField.firstChild?.length || 0;
  // Verificar si la posición es válida
  if (position <= textLength) {
    // Obtener el primer nodo hijo de texto, si existe
    var textNode = romanField.firstChild;
    // Si hay un nodo de texto, usarlo para mover el cursor
    if (textNode && position > 0) {
      range.setStart(textNode, position);
      range.setEnd(textNode, position);
    } else if (position < 0) {
      range.setStart(textNode, 0);
    }
    else {
      // Si no hay un nodo de texto, crear uno vacío y usarlo para mover el cursor
      textNode = document.createTextNode("");
      romanField.appendChild(textNode);
      range.setStart(textNode, 0);
      range.setEnd(textNode, 0);
    }
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    selection.collapse(romanField.firstChild, textLength);
  }
}

function del(){
  if(!romanField.getAttribute('data-before') && !romanField.innerText.trim()) {text.innerHTML = ''; answer.innerHTML = ''; overline = ''; 
  removeElement(); nume.style.display = 'none'; boter.innerText = ''} 
};

var correctorCalled;
var romanToDecimal = function (e){

  var arabicNumber = 0;
  let romanNumber = e.toUpperCase();

  if ((/IIII|XXXX|CCCC|MMMM/).test(romanNumber)) {corrector(0)};

  if ((/VV|LL|DD/).test(romanNumber)) {corrector(1)};
  
  for (let i = 0; i < romanNumber.length; i++) {
    const currentValue = Number(romanNumerals[romanNumber[i]]);
    const nextValue = Number(romanNumerals[romanNumber[i + 1]]);
    const secondNextValue = Number(romanNumerals[romanNumber[i + 2]]);
    if (nextValue && nextValue > currentValue) {
      arabicNumber -= currentValue;
      if([5, 50, 500].includes(currentValue)) {corrector(2)};

      for (let f = 0; f < 3; f++){
      if(currentValue == 1*10**f && ![5*10**f, 10*10**f].includes(nextValue)) {
        TypeOne(romanNumber[i], romanNumber[i + 1]);
        corrector(oneError);
        };
      };

      if (['V', 'L', 'D'].includes(romanNumber[i-1])) if(romanNumber[i-1] == romanNumber[i+1]) {corrector(3)};

      if (['I', 'X', 'C'].includes(romanNumber[i])) if(romanNumber[i] == romanNumber[i+2]) {corrector(4)} else if (romanNumber[i-1] == romanNumber[i]) {corrector(5)};

      if (currentValue < (nextValue, secondNextValue)) {corrector(6)}
    } else {
      arabicNumber += currentValue;
    }
  }
  return arabicNumber;
};

function decimalToRoman(decimal) {
  var roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  var ans = '';

  var convert = function(value) {
    var result = '';
    for (var a in roman) {
      while (value >= roman[a]) {
        result += a;
        value -= roman[a];
      }
    }
    return result;
  };

  if (decimal > 3999999999) {
    var bilions = Math.floor(decimal / 1e9);
    decimal %= 1e9;
    tripleline = convert(bilions);
  } else if (decimal < 4e9) {tripleline = ''}
  else {tripleline = ''}

  if (decimal > 3999999) {
    var millions = Math.floor(decimal / 1e6);
    decimal %= 1e6;
    doubleline = convert(millions);
  } else if (decimal < 4e6) {doubleline = ''}
  else {doubleline = ''}

  if (decimal > 3999) {
    var thousands = Math.floor(decimal / 1e3);
    decimal %= 1e3;
    overline = convert(thousands);
  } else if (decimal < 4000) {overline = ''}
  else {overline = ''}
  
  ans += convert(decimal);
  return ans;
}; 

corrector = (i) => {
  correctorCalled = true;
  removeElement();
  index = i;
  if (id == 'a') {cursor()}
  else if (id == 'b') (borrarUltimaLetra());
  text.innerText = invalid;
  if (i == oneError) {answer.innerHTML = oneError} else {answer.innerHTML = invAns[i]};
  setTimeout(function() {index = ''; answer.innerHTML = '', text.innerText = ''; }, 3000);
};

function cursor() {
  var rango = window.getSelection().getRangeAt(0);
  var posicion = rango.startOffset;
  romanField.innerText = romanField.innerText.slice(0, -1)
  if (posicion > romanField.innerText.length) {
    posicion = romanField.innerText.length;
};
  rango.setStart(romanField.childNodes[0], posicion);
  rango.setEnd(romanField.childNodes[0], posicion);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(rango);
}

  const keys = Object.keys(romanNumerals);
  const values = Object.values(romanNumerals);
  for (let i = 0; i < 7; i++) {
  const h2 = document.createElement('h2');
  const color = i % 2 === 0 ? '#1E90FF' : '#00bcd4';
  h2.innerHTML = `<span style="color:#32CD32">${keys[i]}</span> = <span style="color:${color}">${values[i]}</span>`;
  var titleArray = ['ūnus','quinque','decem','quinquaginta','centum','Quingenti','Mille'];
  h2.title = `${titleArray[i]}`
  container.appendChild(h2);
}

var cambiarValor = function (valor) {
  id = 'b'
  var valorActual = romanField.getAttribute('data-before');
  romanField.setAttribute('data-before', valorActual + valor);
  if (valorActual == null) romanField.setAttribute('data-before', valor);
  sessionStorage.setItem("DecimalKey", romanToDecimal(romanField.getAttribute('data-before'), 'b')*1000)
  if (!regexRoman.test(romanField.innerText)) {sessionStorage.setItem("DecimalKey", ''), romanField.setAttribute('data-before', '')}
  else {nume.innerHTML = nume.innerHTML.replace('decimal', 'romano'), boter.innerHTML = boter.innerHTML.replace('romano', 'decimal')}
  if (regexRoman.test(romanField.innerText)) {nume.style.display = 'block'};
  changelanguaje()
};

function borrarUltimaLetra() {
  var valor = romanField.getAttribute('data-before');
  if (valor.length > 0) {
      romanField.setAttribute('data-before', valor.slice(0, -1));
  }
  romanToDecimal(romanField.getAttribute('data-before'));
  sessionStorage.setItem("DecimalKey", romanToDecimal(romanField.getAttribute('data-before'))*1000);
  if (sessionStorage.getItem('DecimalKey') == 0) {sessionStorage.removeItem('DecimalKey'); del()}
}

function eraseAll() {
  romanField.setAttribute('data-before', '');
  sessionStorage.removeItem('DecimalKey');
  del()
}

romanField.addEventListener('paste', function(e) {
  // Cancela la operación de pegado original
  e.preventDefault();

  // Obtiene el texto del portapapeles
  var text = e.clipboardData.getData('text/plain').trim();

  // Inserta el texto sin formato en el elemento editable
  document.execCommand('insertText', false, text);
});

function removeElement() {
  if (text.parentNode.contains(oneLine)) {
    text.parentNode.removeChild(oneLine);
  }
  if (answer.parentNode.contains(twoLine)) {
    answer.parentNode.removeChild(twoLine)
  }
  if (answer.parentNode.contains(threeLine)) {
    answer.parentNode.removeChild(threeLine)
  }
}

