let storedValue="";
let displayText = "";
let operator = "";

window.addEventListener("load", ()=>{
    const display = document.querySelector(".display");
    const calcButtons = document.querySelectorAll(".calcButton");
    const acButton = document.querySelector(".acButton")
    const operatorButton = document.querySelectorAll(".operatorButton")
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

        })
    }

    //AC removes the last character
    acButton.addEventListener('click', ()=>{
        if(display.innerText==="Clear"){
            return
        }
        //.slice(0,-1) remove the last character (Function of AC)
        storedValue=storedValue.slice(0,-1)
        
        //Just reset the displayText, then shrink it until it fits the screen 
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
    })
    
});

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