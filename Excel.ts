// Designing a backend Excel Api
// In the Excel document, users can input 2 forms. 
//         - Positive Integer only 
//         - Formula's of form(They refer to specific cells)
//              - Only operator permitted is addition


//      Cell A     Cell B
//Row 1   4          5
//Row 2   6         =A1+B1+3
//Row 3  =B1        =B2+A1

// A1 Parent: Empty []
// A1 Value: 4
// A1 RawValue: 4 (string input)
// A1 Children: [B2, B3]

// B2 Parent: [A1, B1]
// B2 Value: 12
// B2 RawValue: "A1+B1+3"
// B2 Children: [B3]

//Design 2 methods (2 api calls)

//First is a put method 
//Given a Cell ID, Value needs to be stored

//Second is a get method
//Given a Cell ID, return Value of that cell

const alphabeticRegex = /[a-zA-Z]/;


class cell {

    cellLocation: string;
    parent: cell[];
    value: number;
    rawValue: string;
    children: cell[];
    //needsToUpdate: boolean;

    constructor(cellLocation: string, rawValue: string, map: Map<string, cell>){
        this.cellLocation = cellLocation;
        this.parent = [];
        this.children = [];
        this.rawValue = this.rawValue;
        this.value = this.put(rawValue, map);
    }

    put(rawValue: string, map: Map<string, cell>){

        let value = 0;
        let newParent = []

        for(let p of this.parent){
            let newChildren = [];
            for(let c of p.children){
                if(c.cellLocation !== this.cellLocation){
                    newChildren.push(c);
                }
            }
            this.children = newChildren;
        }

        if(rawValue.startsWith('=')){
            let input = rawValue.substring(1);
            let tokens = input.split('+');
            for(let t of tokens){
                if(alphabeticRegex.test(t)){
                    if(map.has(t)){
                        newParent.push(map.get(t));
                        value = value + map.get(t).value;
                        map.get(t).children.push(this);
                    }
                } else {
                    value = value + parseInt(t);
                }
            }
        } else {
            value = parseInt(rawValue);
        }
        this.parent = newParent;
        return value;
    }

    get(){
        return this.value;
    }

    checkForCycle(rawValue: string, map: Map<string, cell>){
        let set: Set<cell> = new Set<cell>();
        set.add(this);
        if(rawValue.startsWith('=')){
            rawValue = rawValue.substring(1);
            let tokens = rawValue.split('+');
            for(let t of tokens){
                let cellT = map.get(t);
                if(set.has(cellT)){
                    return true;
                } else {
                    set.add(cellT);
                    
                }
            }
        }

    }
}


class sheet {
    map: Map<string, cell>;

    constructor(){
        this.map = new Map<string, cell>();
    }

    add(cellLocation: string, rawValue: string){
        if(this.map.has(cellLocation)){
            this.map.get(cellLocation).put(rawValue, this.map);
        } else {
            this.map.set(cellLocation, new cell(cellLocation, rawValue, this.map));
        }
    }

    get(cellLocation: string){
        return this.map.get(cellLocation).get();
    }

}


function testExcel(){
    let Spreadsheet: sheet = new sheet();
    Spreadsheet.add("A1", "4");
    Spreadsheet.add("B1", "5");
    Spreadsheet.add("A2", "6");
    Spreadsheet.add("B2", "=A1+B1+3");
    Spreadsheet.add("A3", "=B1");
    Spreadsheet.add("B3", "=B2+A1");

    console.log(Spreadsheet.get("A1"));
    console.log(Spreadsheet.get("B1"));
    console.log(Spreadsheet.get("A2"));
    console.log(Spreadsheet.get("B2"));
    console.log(Spreadsheet.get("A3"));
    console.log(Spreadsheet.get("B3"));

    Spreadsheet.add("A1", "5");
    console.log(Spreadsheet.get("B2"));
}

testExcel();




























// class spreadSheet{
//     sheet: Map<string, cell>;

//     constructor(){
//         this.sheet = new Map<string, cell>();
//     }

//     put(cellLocation: string, rawValue: string){
//         if(this.sheet.has(cellLocation)){
//             this.sheet.get(cellLocation).put(rawValue, this.sheet);
//         } else {
//             this.sheet.set(cellLocation, new cell(cellLocation, this.sheet,  rawValue))
//         }
//     }
// }

// class cell {
//     cellLocation: string;
//     parent: cell[];
//     value: number;
//     rawValue: string;
//     children: cell[];

//     constructor(cellLocation: string, map: Map<string, cell>, rawValue?: string){
//         this.cellLocation = cellLocation;
//         this.parent = [];
//         this.children = [];
//         this.rawValue = rawValue;

//         const alphabeticRegex = /[a-zA-Z]/;
//         if(cellLocation !== undefined){
//             this.cellLocation = cellLocation;
//         }
//         if(rawValue.includes('+')){
//             let parentCell = []
//             let tokens = rawValue.slice(1).split('+');
//             let newValue = 0;
//             for(let t of tokens){
//                 if(alphabeticRegex.test(t)){
//                     newValue = newValue + this.get(map.get(t));
//                 } else {
//                     newValue = newValue + parseInt(t);
//                 }
//             }
//             if(map.has(cellLocation)){

//             }
//         }
//     }

//     put(rawValue: string, map: Map<string, cell>){

//     }

//     get(val: cell){
//         return val.value;
//     }
// }