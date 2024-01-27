let storedValue="";
let displayText = "";
let operator = "";

window.addEventListener("load", ()=>{
    const display = document.querySelector(".display");
    const calcButtons = document.querySelectorAll(".calcButton");
    const acButton = document.querySelector(".acButton")
    for(let button of calcButtons){
        button.addEventListener('click', ()=>{
            storedValue+=button.textContent
            displayText+=button.textContent
            display.textContent=displayText
            if (display.scrollWidth > display.clientWidth) {
                // Update the content with the new text
                displayText = displayText.slice(1)
                display.textContent = displayText
            }
        })
    }
    acButton.addEventListener('click', ()=>{
        storedValue=""
        displayText=""
        display.textContent = "Clear"
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