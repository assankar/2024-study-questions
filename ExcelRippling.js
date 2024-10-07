class Excel {
    map;
    children;
    // parents: Map<string, Set<string>>;
    sumMap;
    constructor(height, width) {
        this.map = new Map();
        this.children = new Map();
        this.sumMap = new Map();
        let initialLetter = 'A';
        for (let i = 1; i <= height; i++) {
            while (initialLetter !== width) {
                this.map.set(initialLetter + i.toString(), 0);
                this.children.set(initialLetter + i.toString(), new Set());
                this.sumMap.set(initialLetter + i.toString(), []);
                // this.parents.set(initialLetter + i.toString(), new Set<string>());
                initialLetter = String.fromCharCode(initialLetter.charCodeAt(0) + 1);
            }
            this.map.set(initialLetter + height, 0);
            this.children.set(initialLetter + height.toString(), new Set());
            this.sumMap.set(initialLetter + height.toString(), []);
            // this.parents.set(initialLetter + height.toString(), new Set<string>());
            initialLetter = 'A';
        }
    }
    set(row, column, val) {
        this.map.set(column + row.toString(), val);
        // if(this.parents.get(column+row.toString()).size === 0){
        //     return;
        // } else {
        // }
        this.sumMap.set(column + row.toString(), []);
        if (this.children.get(column + row.toString()).size === 0) {
            return;
        }
        else {
            let childrens = this.children.get(column + row.toString());
            for (let child of childrens.keys()) {
                let rC = parseInt(child[1]);
                let cC = child[0];
                this.sum(rC, cC, this.sumMap.get(child));
            }
        }
    }
    get(row, column) {
        return this.map.get(column + row.toString());
    }
    sum(row, column, numbers) {
        let res = column + row.toString();
        this.sumMap.set(res, numbers);
        let sum = 0;
        for (let num of numbers) {
            if (num.length === 2) {
                //let rN = parseInt(num[1]);
                //let cN = num[0];
                sum = sum + this.map.get(num);
                this.children.set(num, this.children.get(num).add(res));
            }
            else {
                let tokens = num.split(":");
                let t1C = parseInt(tokens[0][1]);
                let t1R = tokens[0][0];
                let t2C = parseInt(tokens[1][1]);
                let t2R = tokens[1][0];
                for (let i = t1C; i <= t2C; i++) {
                    for (let j = t1R; j !== t2R; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
                        sum = sum + this.map.get(j + i.toString());
                        this.children.set(j + i.toString(), this.children.get(j + i.toString()).add(res));
                    }
                    sum = sum + this.map.get(t2R + i.toString());
                    this.children.set(t2R + i.toString(), this.children.get(t2R + i.toString()).add(res));
                }
            }
        }
        this.map.set(res, sum);
        return sum;
    }
}
/**
 * Your Excel object will be instantiated and called as such:
 * var obj = new Excel(height, width)
 * obj.set(row,column,val)
 * var param_2 = obj.get(row,column)
 * var param_3 = obj.sum(row,column,numbers)
 */
let ex = new Excel(5, 'E');
ex.set(1, 'A', 1);
ex.sum(2, 'B', ["A1"]);
ex.set(2, "B", 0);
ex.get(2, 'B');
ex.set(1, "A", 5);
console.log(ex.children);
console.log(ex.map);
console.log(ex.sumMap);
console.log(ex.get(2, 'B'));
//# sourceMappingURL=ExcelRippling.js.map