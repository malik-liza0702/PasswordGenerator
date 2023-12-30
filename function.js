const inputSlider=document.querySelector("input[type=range]");
const lengthDisplay=document.querySelector(".lengthDisplay");
let passwordLength=10;
handleSlider();
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    // handling slider bar color on changing
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";
   
}
inputSlider.addEventListener('input',(r)=>{
    passwordLength=r.target.value;
    handleSlider();

})
// ------------------------------------------------
function getRandInteger(max,min){
    console.log("generated random Integer");
    return Math.floor(Math.random()*(max-min))+min;

}
function getRandomNumber(){
    console.log("generated random Number");
    return getRandInteger(1,10);
    
}
function getLowerCase(){
    console.log("generated random lowercase");
    return String.fromCharCode(getRandInteger(97,123));
    
}
function getUpperCase(){
    console.log("generated random uppercasecase");
    return String.fromCharCode(getRandInteger(65,91));
}
const symbolString="+-*/.<>()&%^$#!~`[]{}:;_";

function getSymbol(){
    console.log("generated random Symbol");
    const randNum=getRandInteger(0,symbolString.length);
    return symbolString[randNum];
}
// ---------------------------------------------------------
const upperCase=document.querySelector("#uppercase");
const lowerCase=document.querySelector("#lowercase");
const numbers=document.querySelector("#numbers");
const symbols=document.querySelector("#symbols");
function calStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbol=false;

    if(upperCase.checked) hasUpper=true;
    if(lowerCase.checked) hasLower=true;
    if(numbers.checked) hasNumber=true;
    if(symbols.checked) hasSymbol=true;

    if(hasUpper && hasLower && (hasNumber||hasSymbol) && passwordLength>=8){
        setIndicator("lightgreen");
    }
    else if((hasLower||hasUpper)&&(hasNumber||hasSymbol) && passwordLength<=6){
        setIndicator('red');
    }
    else{
        setIndicator("grey");
    }

}
// -------------------------------------------------------
const indicator=document.querySelector(".data-indicator");
function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0 0 12px 1px ${color}`;
}
// defualt colorof indicator
setIndicator("#ccc");
// --------------------------------------------

const passwordDisplay=document.querySelector("input[passwordDisplay]");
const copyButton=document.querySelector(".copy-Btn");
const copyMsg=document.querySelector(".copy-msg");
async function copyContent(){
    try{
        // navigator.clipBoard.writeText() is an inbuilt methos of clipboard Api for copying data to clipboard
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText='copied';

    }
    catch(e){
        copyMsg.innerText='failed';

    }
    copyMsg.classList(".active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
    
}
copyButton.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})
// -------------------------------------------------
// SHUFFLE ALGORITHM--->FISHER YATES(KNUTH ALGORITHM)
function shufflePassword(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((ele)=>{
        str+=ele;
    });
    return str;
}
// -----------------------------------------------------
const check=document.querySelectorAll("input[type=checkbox]");
console.log(check);
let checkCount=0;
function handleCheckBox(){
    checkCount=0;
    check.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    // special condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
check.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBox);
})
// -----------------------------------

const button=document.querySelector(".button");
let password="";
button.addEventListener('click',()=>{
    //  no checkbox selected
    if(checkCount<=0) {return;}
    if(passwordLength <checkCount){
        passwordLength=checkCount;
        handleSlider();

    }
    // remove old password
    password=""
    
    let funcArr=[];
    if(upperCase.checked){
        funcArr.push(getUpperCase);
    }
    if(lowerCase.checked){
        funcArr.push(getLowerCase);
    }
    if(numbers.checked){
        funcArr.push(getRandomNumber);
    }
    if(symbols.checked){
        funcArr.push(getSymbol);
    }
    // compulsoryAddition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
        console.log("in func 1");
    }

    // remaining addition
    for(let i=0; i< passwordLength - funcArr.length;i++){
        let randIdx=getRandInteger(0,funcArr.length);
        password+=funcArr[randIdx]();
        console.log("in func 2");
    }
    // shuffling password
    password=shufflePassword(Array.from(password));

    passwordDisplay.value=password;
    calStrength();


})

// ------------------------------------------------------






