class Database {
    map: Map<string, string>;
    transactionMap: Map<string, string>;
    intrasaction: boolean;

    constructor() {
        this.map = new Map<string, string>();
        this.intrasaction = false;
    }

    begin(){
        this.transactionMap = new Map<string, string>();
        this.intrasaction = true;
    }

    commit(){

    }

    rollback(){

    }

    get(key: string){
        if(this.intrasaction){
            if (this.transactionMap.has(key)){
                return this.transactionMap.get(key);
            } else {
                return this.map.get(key);
            }
        } else {
            return this.map.get(key);
        }
    }

    put(key: string, val: string){
        this.map.set(key, val);
    }

    delete(key: string){
        this.map.delete(key);
    }
}

function testKeyValueStore(){
    let db: Database = new Database();

    db.put('key1', 'val1');
    db.begin();
    db.put('key2', 'val2');
    db.commit();
    db.get('key2');
    db.begin();
    db.put('key3', 'val3');
    db.get('key3');
    db.rollback();
}