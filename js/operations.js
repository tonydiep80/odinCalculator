let storedValue="";
let displayText = "";
let operator = "";

let operandOne = "";
let operandTwo = "";
let display;

window.addEventListener("load", ()=>{
    display = document.querySelector(".display");
    const calcButtons = document.querySelectorAll(".calcButton");
    const acButton = document.querySelector(".acButton")
    const operatorButton = document.querySelectorAll(".operatorButton")
    const equalButton = document.querySelector(".equalButton")
    for(let button of calcButtons){
        button.addEventListener('click', ()=>{
            storedValue+=button.textContent
            displayText+=button.textContent
            display.textContent=displayText
            //If the added text overflows, only show the new content, remove the first number from the display
            if (display.scrollWidth > display.clientWidth) {
                // Update the content with the new text
                displayText = displayText.slice(1)
                display.textContent = displayText
            }
        })
    }
    for(let button of operatorButton){
        button.addEventListener('click', ()=>{
            //Okay, so we want to display the entire string and everything, but if we mess around with stored value and shit by clearing it, it will mess up the acButton
            //What we should just do is have one giant ass string, when we click an operator button, just add the operator to the long ass string
            //Base cases for the operators
            /*
            There's already an operator, change it
            there isn't an operator, append
             */
            //Then for negative cases:
            /*
            1. long ass string is empty, add the negative to the string
            2. Check the string at the end, if it's already a negative operator, don't do anything
                if it isn't a negative operator, append          
            Gotta do PEMDAS
            
            Splice the strings based on the operators
            Check the newly created array for these operators first
            Check the index before and after to do calculations
            Special case negatives again 
            If it's a negative operator, check the index before,
            If it's empty, then the number after is a negative number
            If it's not empty, is it another operator? Then the number after is negative 
            If it's not an operator, it has to be a number, then do normal subraction 
            */
            const operators = ["/", "X", "+"]
            if(button.innerText == "-"){
                //Need to have a base case, otherwise the check for length would be out of bounds 
                if(storedValue.length === 0){
                    storedValue+= button.innerText;
                }
                else if(storedValue[storedValue.length-1] === "-"){
                    return;
                }
                else{
                    storedValue+= button.innerText;
                }
            }
            //Normal operators 
            else{
                //If length is 0 or if the first sign is negative, skip 
                if(storedValue.length === 0 || (storedValue.length == 1 && storedValue[0] === "-")){
                    return;
                }
                if(storedValue[storedValue.length-1]=="-"){
                    //If it's something like +-, we want to return immedieatly so nothing can be changed. 
                    if (operators.includes(storedValue[storedValue.length-2])){
                        return; 
                    }
                    //The negative sign is by itself, so now it can be replaced 
                    storedValue=storedValue.slice(0,-1)
                }
                //If there's already an operator remove it so it can be replaced 
                if(operators.includes(storedValue[storedValue.length-1])){
                    storedValue=storedValue.slice(0,-1)
                }
                
                storedValue+= button.innerText
           }
            
            
            updateDisplay();
        })
    }
    //AC removes the last character
    acButton.addEventListener('click', ()=>{
        if(display.innerText==="Clear"){
            return
        }
        //.slice(0,-1) remove the last character (Function of AC)
        storedValue=storedValue.slice(0,-1)
        updateDisplay();
        //Just reset the displayText, then shrink it until it fits the screen 
        
    })
});

function updateDisplay(){
    displayText = storedValue;
    display.textContent = displayText
    while(display.scrollWidth > display.clientWidth) {
        displayText = displayText.slice(1)
        display.textContent = displayText
    }
    //Check if it's empty 
    if(displayText.length==0){
        displayText = ""
        display.textContent="Clear"
    }
}
function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b; 
}



function operate(input1, input2, operator){
    if(typeof input1 !== "number" || typeof input2 !== "number")
        throw new Error("At least one input is not a number")
    if(operator==="+")
        return add(input1,input2)
    if(operator==="-")
        return subtract(input1,input2)
    if(operator==="x")
        return multiply(input1,input2)
    if(operator==="/")
        return divide(input1, input2)
    throw new Error("operator does not exist")
}