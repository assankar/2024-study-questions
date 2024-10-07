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
class Esheet {
    map;
    constructor() {
        this.map = new Map();
    }
    add(cellLocation, rawValue) {
        if (this.map.has(cellLocation)) {
            this.map.get(cellLocation).put(rawValue, this.map);
        }
        else {
            this.map.set(cellLocation, new Ecell(cellLocation, rawValue, this.map));
        }
    }
    get(cellLocation) {
        return this.map.get(cellLocation).get();
    }
}
class Ecell {
    location;
    rawValue;
    value;
    children;
    parent;
    constructor(loc, rawValue, map) {
        this.location = loc;
        this.rawValue = rawValue;
        this.value = this.put(rawValue, map);
    }
    put(rawValue, map) {
        let newParent = [];
        if (rawValue[0] !== "=") {
            this.parent = newParent;
            return parseInt(rawValue);
        }
        else {
            let equation = this.rawValue.substring(1);
            rawValue = equation;
            let counter = 0;
            let val = map.get(rawValue.substring(0, 2)).value;
            newParent.push(map.get(rawValue.substring(0, 2)));
            rawValue = rawValue.substring(2);
            console.log(rawValue);
            console.log(val);
            for (let i = counter; i < rawValue.length; i = i + 2) {
                if (rawValue[counter] === "+") {
                    console.log(rawValue.substring(i + 1, 3));
                    console.log(map.get(rawValue.substring(i + 1, i + 3)));
                    if (map.has(rawValue.substring(i + 1, 2))) {
                        val = val + map.get(rawValue.substring(i + 1, i + 3)).value;
                        newParent.push(map.get(rawValue.substring(i + 1, i + 3)));
                    }
                    //rawValue = rawValue.su
                }
                else if (rawValue[counter] === "-") {
                    if (map.has(rawValue.substring(i + 1, 2))) {
                        val = val - map.get(rawValue.substring(i + 1, i + 3)).value;
                        newParent.push(map.get(rawValue.substring(i + 1, i + 3)));
                    }
                }
                else if (rawValue[counter] === "*") {
                    if (map.has(rawValue.substring(i + 1, 2))) {
                        val = val * map.get(rawValue.substring(i + 1, i + 3)).value;
                        newParent.push(map.get(rawValue.substring(i + 1, i + 3)));
                    }
                }
                else if (rawValue[counter] === "/") {
                    if (map.has(rawValue.substring(i + 1, i + 3))) {
                        val = val / map.get(rawValue.substring(i + 1, i + 3)).value;
                        newParent.push(map.get(rawValue.substring(i, i + 3)));
                    }
                }
                counter = counter + 2;
            }
            this.parent = newParent;
            return val;
        }
    }
    get() {
        return this.value;
    }
}
//      Cell A     Cell B
//Row 1   4          5
//Row 2   6         =A1+B1+3
//Row 3  =B1        =B2+A1
function testExcel2() {
    let Spreadsheet = new Esheet();
    Spreadsheet.add("A1", "4");
    Spreadsheet.add("B1", "5");
    Spreadsheet.add("A2", "6");
    Spreadsheet.add("B2", "=A1+B1+3");
    //Spreadsheet.add("A3", "=B1");
    //Spreadsheet.add("B3", "=B2+A1");
    //console.log(Spreadsheet.get("A1"));
    //console.log(Spreadsheet.get("B1"));
    //console.log(Spreadsheet.get("A2"));
    console.log(Spreadsheet.get("B2"));
    //console.log(Spreadsheet.get("A3"));
    //console.log(Spreadsheet.get("B3"));
}
testExcel2();
//# sourceMappingURL=excelrip.js.map