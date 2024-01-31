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
    equalButton.addEventListener('click',()=>{
        const delimiters = /[+\-\/X]/;
        let operands = storedValue.split(delimiters)
        operands = operands.filter(number => number != "") //get rid of empty 

        //Need to have at least two operands to calculate a result 
        if(operands.length < 2){
            return;
        }
        pemdasAssessor();
        //tokenAssessor();


    })
});
function pemdasAssessor(){
    let tokens = []
    const operators = ["/", "X", "+", "-"]
    let number = ""
    for(let i = 0; i < storedValue.length; i++){
        if(operators.includes(storedValue[i])){
            //If it's a negative operator && if it's the first index, the number must be negative.
            //If it's not the first index, check the position before it. Is it also a sign? Then this incoming number must be negative
            if(storedValue[i] == "-" && (i==0 || operators.includes(storedValue[i-1]))){
                number+="-"
            }
            else{
                tokens.push(number)
                tokens.push(storedValue[i])
                number = ""
            }
        }
        else{
            number+=storedValue[i]
        }
    }
    if(number.length > 0){
        tokens.push(number)
    }
    //console.log(tokens)

    while(tokens.length > 1){
        for(let i = 0; i < tokens.length; i++){
            let index;
            let output;
            
            if((index = tokens.indexOf("/")) >= 0 || (index = tokens.indexOf("X")) >= 0){
                output = String(operate(Number(tokens[index-1]), Number(tokens[index+1]), tokens[index]))
                tokens.splice(index-1, 3, output)
                break; //Break because the length has been updated
            }
            else if((index = tokens.indexOf("+")) >= 0 || (index = tokens.indexOf("-")) >= 0){
                output = String(operate(Number(tokens[index-1]), Number(tokens[index+1]), tokens[index]))
                tokens.splice(index-1, 3, output)
                break; //Break because the length has been updated
            }
        }
    }
    //console.log("Result: " + tokens[0])
    storedValue=tokens[0]
    updateDisplay()

}
function tokenAssessor(){
    let calculatedOnce = false;
    const operators = ["/", "X", "+", "-"]
    let number1 = ""
    let number2 = ""
    let operand = ""
    for(let i = 0; i < storedValue.length; i++){
        //Example: 1+2-, we must calculate the 1+2 before we update the operand
        //However, if it's something like 1+-, we don't want to operate because that simply means the second number is negative
        //We shouldn't need to worry about ++ // xx +x etc, because I solved it earlier 
        if(operators.includes(storedValue[i]) && operand.length > 0 && number2.length >0){
            number1 = String(operate(Number(number1), Number(number2),operand))
            number2 = ""
            operand = ""
            calculatedOnce = true; 
        }
        if(storedValue[i] == "-"){
            if(i==0){
                number1+="-"
            }
            //If there's an operator before this negative sign, then that must mean the second number is negative
            else if(operators.includes(storedValue[i-1])){
                number2+="-"
            }
            else{
                operand = "-"
            }
        }
        else if(operators.includes(storedValue[i])){
            operand = storedValue[i]
        }
        else if(operand.length!=0 || calculatedOnce){
            number2+=storedValue[i]
        }
        else{
            number1+=storedValue[i]
        }
    }
    if(number2.length>0){
        number1 = String(operate(Number(number1), Number(number2),operand))
        number2 = ""
        operand = ""
    }
    storedValue = number1
    updateDisplay();
}

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
    if(operator==="X")
        return multiply(input1,input2)
    if(operator==="/")
        return divide(input1, input2)
    throw new Error("operator does not exist")
}