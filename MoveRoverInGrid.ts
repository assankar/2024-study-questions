/*
    NXM Grid
    5 x 5
    row col compass
    1 2 N (N/S/E/W)

    LMR (L = left, R = right, M move forward)

    LML

    returns 

    1 1 S
*/

class Grid{
    private rowSize: number;
    private colSize: number;
    grid: number[][];

    constructor(row: number, col: number){
        this.rowSize = row;
        this.colSize = col;
        this.grid = [[]];
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[0].length; j++){
                this.grid[i][j] = 0;
            }
        }
    }

    getRowSize(){
        return this.rowSize;
    }

    getColSize(){
        return this.colSize;
    }
}

class Rover{
    private positionRow: number;
    private positionCol: number;
    private compass: string;
    private grid: Grid;

    constructor(ir: number, ic: number, comp: string, grid: Grid){
        if(ir > grid.getRowSize()){
            throw new Error('Not starting in Grid');
        }
        if(ic > grid.getColSize()){
            throw new Error('Not starting in Grid');
        }
        this.positionCol = ic;
        this.positionRow = ir;
        if(comp === "N" || comp === "S" || comp === "E" || comp === "W"){
            this.compass = comp;
        } else {
            throw new Error("not a compass direction");
        }
        this.grid = grid;
    }

    moveRover(input: string){
        if(input.match(/[^LRM]/)){
            throw new Error('invalid input');
        }

        for(let movement of input){
            if(movement === "L"){
                if(this.compass === "N"){
                    this.compass = "W";
                } else if(this.compass === "S"){
                    this.compass = "E";
                } else if(this.compass === "W"){
                    this.compass = "S";
                } else if(this.compass === "E"){
                    this.compass = "N";
                }
            } else if(movement === "R") {
                if(this.compass === "N"){
                    this.compass = "E";
                } else if(this.compass === "S"){
                    this.compass = "W";
                } else if(this.compass === "W"){
                    this.compass = "N";
                } else if(this.compass === "E"){
                    this.compass = "S";
                }
            } else if(movement === "M") {
                if(this.compass === "N"){
                    this.positionRow--;
                } else if(this.compass === "S"){
                    this.positionRow++;
                } else if(this.compass === "W"){
                    this.positionCol--;
                } else if(this.compass === "E"){
                    this.positionCol++;
                }
            }
        }
    }

    printRoverLocation(){
        console.log(this.positionRow);
        console.log(this.positionCol);
        console.log(this.compass);
    }
}

function testRoverMoveInGrid(){
    let g: Grid = new Grid(5, 5);
    let rover: Rover = new Rover(1, 2, "N", g);
    rover.moveRover("LML");
    rover.printRoverLocation(); 
}

testRoverMoveInGrid();