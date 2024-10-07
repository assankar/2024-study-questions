/*
interface Hashtable {
    **
     * Map the given key to the given value.
     * @return The previous value mapped to the key, or null.
     *
    Object put(Object key, Object value);

    **

     * @return The current mapped value for the key, or null.
     *
    Object get(Object key);

    **
     * Remove the key from the hashtable.
     * @return The previous mapped value for the key, or null.
     *
    Object delete(Object key);
}

Object {
    bool equals(Object o)
    int hashCode()
}

*/

/*
    HashMap('test, 10)
    
    list [ ,,,,,,]
    
    map.add('test');
    int num =hashCode('test); //1
    
    list [,10,,,,,]

*/

class LLNode {
    key: string
    value: any
    next: LLNode

    constructor(key: string, val: any, next?: LinkedListNode){
        if(key === undefined){
            this.key = null;
        } else {
            this.key = key;
        }
        if(val === undefined){
            this.value = null;
        } else {
            this.value = val;
        }
        if(next === undefined){
            this.next = null;
        } else {
            this.next = next;
        }
    }
}

let map:Array<LLNode> = new Array<LLNode>(32);

function hashCode(s:string): number {
    return s.length;
}

function add(key: string, value: any){
    let hashCodeKey = hashCode(key);

    if(map[hashCodeKey] === undefined){
        map[hashCodeKey] = new LLNode(key, value, null);
    } else {
        let temp = map[hashCodeKey];
        while(temp !== null){
            if(temp.key === key){
                temp.value = value;
                return;
            } else {
                if(temp.next !== null){
                    temp = temp.next;
                } else {
                    break;
                }
            }
        }
        temp.next = new LLNode(key, value, undefined);
    }
}

function get(key: string){
    let hashCodeKey = hashCode(key);

    if(map[hashCodeKey] === undefined){
        return null;
    } else {
        let temp = map[hashCodeKey];
        while(temp !== null){
            if(temp.key === key){
                return temp.value;
            } else {
                temp = temp.next;
            }
        }
    }

    return null;
}

function remove(key: string){
    let hashCodeKey = hashCode(key);

    if(map[hashCodeKey] === undefined){
        return;
    }
    else {
        let temp = map[hashCodeKey];
        while(temp !== null){
            if(temp.key === key){
                if(temp.next !== null){
                    map[hashCodeKey] = temp.next;
                    temp.next = null;
                    return;
                }
                else {
                    map[hashCodeKey] = undefined;
                    break;
                }
            }
        }
    }

    return;
}

function testHashMap(){
    add('test', 12);
    console.assert(12, get('test'));

    add('testy', 5);
    console.assert(5, get('testy'));

    add('test', 4);
    console.assert(4, get('test'));

    remove('test');
    if(get('test') !== null){
        console.log('error, the key-value-pair should have been removed.')
    }

    add('resty', 6);
    console.assert(5, get('testy'));
    console.assert(6, get('resty'));
}

testHashMap();