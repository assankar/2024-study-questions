class Database {
    map;
    transactionMap;
    intrasaction;
    constructor() {
        this.map = new Map();
        this.intrasaction = false;
    }
    begin() {
        this.transactionMap = new Map();
        this.intrasaction = true;
    }
    commit() {
    }
    get(key) {
        if (this.intrasaction) {
            if (this.transactionMap.has(key)) {
                return this.transactionMap.get(key);
            }
            else {
                return this.map.get(key);
            }
        }
        else {
            return this.map.get(key);
        }
    }
    put(key, val) {
        this.map.set(key, val);
    }
    delete(key) {
        this.map.delete(key);
    }
}
//# sourceMappingURL=KeyValuePairStore.js.map