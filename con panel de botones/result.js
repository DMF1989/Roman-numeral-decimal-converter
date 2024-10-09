let answer = document.getElementById("result");
let text = document.getElementById("thousandsText");
var oneLine;
var overline;
var twoLine
var doubleline;
var threeLine
var tripleline;
var timer;

function result(){
    removeElement();
    clearTimeout(timer);
    if(overline) {oneLine = document.createElement("span");
    oneLine.innerHTML = overline;
    oneLine.style.cssText = 'text-decoration: overline; position: relative; padding-top: 4px; margin-left: 3px';
    answer.parentNode.insertBefore(oneLine, answer)}
  
    if(doubleline) {twoLine = document.createElement("span");
    twoLine.innerHTML = doubleline;
    twoLine.style.cssText = 'text-decoration: overline; border-top: 2px solid black; position: relative; padding-top: 4px; margin-left: 3px';
    text.insertAdjacentElement('afterend', twoLine)}
  
    if(tripleline) {threeLine = document.createElement("span");
    threeLine.innerHTML = tripleline;
    threeLine.style.cssText = 'text-decoration: overline; border-top: 2px solid black; position: relative; padding-top: 4px; margin-left: 3px';
    threeLine.classList.add('line-before');
    text.insertAdjacentElement('afterend', threeLine)};
  
    if (regexRoman.test(romanField.innerText)) {answer.innerHTML = (Number(sessionStorage.getItem("DecimalKey")) + Number(romanToDecimal(romanField.innerText))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '.'; if (answer.classList.contains('margintext')) {answer.classList.remove('margintext')}} 
    else {answer.innerHTML = romanNumeral + '.';
    answer.classList.add('margintext')};

    if (!romanField.innerText && !sessionStorage.getItem('DecimalKey')) {text.innerText = empty; answer.innerHTML = ''; 
    timer = setTimeout(function() {text.innerText = ''}, 3000)} 
    else {text.innerText = response}

    romanField.focus()
  };