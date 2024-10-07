let mapPosition: Map<string, number> = new Map<string, number>();


class position {
    row: number;
    col: number;
    
    constructor (r: number, c: number){
        this.row = r;
        this.col = c;
    }
}

/*
 0 0 0 0 0 0 0 0 0
 0 0 1 0 0 0 0 1 0
 0 0 1 1 1 0 0 1 0
 0 0 1 0 0 0 0 0 0
 0 0 0 0 0 0 0 0 0
 0 0 0 0 1 0 0 0 0

 0 0 0 0 0 0 0 0 0
 0 0 1 0 0 0 0 2 0
 0 0 1 1 1 0 0 2 0
 0 0 1 0 0 0 0 0 0
 0 0 0 0 0 0 0 0 0
 0 0 0 0 3 0 0 0 0
*/

function createLEDBoard(input: number[][]){
    let counter = 1;

    for(let i = 0; i < input.length; i++){
        for (let j = 0; j < input[0].length; j++){
            if(!mapPosition.has(i.toString()+j.toString()) && input[i][j] === 1){
                checkNearBy(input, i, j, counter);
                counter++;
            }
        }
    }

    return input;
}

function checkNearBy(input:number[][], row: number, col: number, counter: number){
    console.log(mapPosition);
    mapPosition.set(row.toString() + col.toString(), 1);
    input[row][col] = counter;

    if(mapPosition.has((row+1).toString()+col.toString()) === false && row+1 < input.length && input[row+1][col] === 1){
        checkNearBy(input, row+1, col, counter);
    }
    //console.log((row-1).toString()+col.toString());
    if(mapPosition.has((row-1).toString()+col.toString()) === false && row-1 >= 0 && input[row-1][col] === 1){
        checkNearBy(input, row-1, col, counter);
    }
    if(mapPosition.has((row).toString()+(col+1).toString()) === false && col+1 <input[0].length && input[row][col+1] === 1){
        checkNearBy(input, row, col+1, counter);
    }
    if(mapPosition.has((row).toString()+(col-1).toString()) === false && col-1 >= 0 && input[row][col-1] === 1){
        checkNearBy(input, row, col-1, counter);
    }
    
    return;
}

function testLEDBoard(){
    let input:number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 1, 0, 0, 0, 0, 1, 0],
                            [0, 0, 1, 1, 1, 0, 0, 1, 0],
                            [0, 0, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 1, 0, 0, 0, 0]];
    /*
    [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 2, 0],
  [0, 0, 1, 1, 1, 0, 0, 2, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0, 0]]


    */

    console.log(createLEDBoard(input));
}

testLEDBoard();