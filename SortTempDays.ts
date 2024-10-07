// [44, 32, 33, 34, 50, 60]
// [4,   1,  1,  1,  1,  0]

function sortTempDays(input: number[]){
    let map: Map<number, number> = new Map<number, number>();

    for(let i = 0; i < input.length; i++){
        map.set(input[i], i);
        console.log(input[i].toString() + " " + map.get(input[i]));
    }
    let stack: number[] = [input[0]];
    let result: number[] = [];

    console.log("-----------------");
    console.log("-----------------");

    for(let i = 1; i <input.length; i++){
        console.log(stack[stack.length-1]); 
        console.log(input[i]);
        console.log(stack[stack.length-1] < input[i]);
        console.log("-----------------");

        while(stack[stack.length-1] < input[i]){
            let t = stack.pop();
            result[map.get(t)] = i-map.get(t);
        }
        stack.push(input[i]);
    }
    result.push(0);

    return result;
}

function testSortTempDays(){
    let testA : number [] = [44, 32, 33, 34, 50, 60];
    console.log(sortTempDays(testA));
}

testSortTempDays();
