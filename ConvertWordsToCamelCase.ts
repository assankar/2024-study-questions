function makeCamelCase(input: string){
    let tokens = input.split(' ');

    let leftunderscore = "";
    let rightudnerscore = "";
    let result = "";
    for(let t of tokens){
        while(t.charAt(0) === '_'){
            t = t.substring(1);
            leftunderscore = leftunderscore + "_";
        }
        while(t.charAt(t.length-1) === '-'){
            t = t.substring(-1);
            rightudnerscore = rightudnerscore + "_";
        }

        if(t.includes('_')){
            let words = t.split('_');
            result = result + leftunderscore + words[0].charAt(0).toLocaleLowerCase()+words[0].substring(1);
            for(let i = 1; i < words.length; i++){
                result = result + "_" + words[i].charAt(0).toLocaleUpperCase()+words[i].substring(1);
            }
            result = result + rightudnerscore;
        }
        result = result + " ";
        leftunderscore = "";
        rightudnerscore = "";
    }
    result = result.substring(-1);
    return result;
}

function testMakeCamelCase(){
    let s: string = "__variable_one__ _variable_two variable_three";

    console.log(makeCamelCase(s));
}

testMakeCamelCase();