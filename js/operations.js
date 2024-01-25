function add(a,b){
    if(!Number.isInteger(a) || !Number.isInteger(b))
        throw new Error("At least one input in add is not a number!")
    return a+b;
}

function subtract(a,b){
    if(!Number.isInteger(a) || !Number.isInteger(b))
        throw new Error("At least one input in subtract is not a number!")
    return a-b;
}

function multiply(a,b){
    if(!Number.isInteger(a) || !Number.isInteger(b))
        throw new Error("At least one input in multiply is not a number!")
    return a*b;
}

function divide(a,b){
    if(!Number.isInteger(a) || !Number.isInteger(b))
        throw new Error("At least one input in divide is not a number!")
    return a/b; 
}