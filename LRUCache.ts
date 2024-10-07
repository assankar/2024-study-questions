// design an LRU cache
// such that the key can be a integer or a string
// the value is of any type
// the cache size is a parameter to the constructor

// what insertion time for the cache? Should be O(1);
// what should the lookup time be for the cache? Should be O(1);
// what should the eviction time for the cache? Should be O(1);
// what should the update value for the cache? Should O(1);

// update/read/add/evict/ 

// in this case we'll use update/read/add as a usage. 
// So then its the most recently used piece of the cache

class LinkedListNode {
    key: string
    value: any
    next: LinkedListNode
    prev: LinkedListNode

    constructor(key: string, val: string){
        this.key = key;
        this.value = val;
    }

    setNext(next: LinkedListNode){
        this.next = next;
    }

    setPrev(prev: LinkedListNode){
        this.prev = prev;
    }
}

class DoubleLinkedList {
    head: LinkedListNode
    tail: LinkedListNode

    constructor() {
        this.head = undefined;
        this.tail = undefined;
    }

    add(newNode: LinkedListNode){
        if(this.tail !== undefined){
            this.tail.setNext(newNode);
            newNode.setPrev(this.tail);
            this.tail = newNode;
        } else {
            this.head = newNode;
            this.tail = newNode;
            newNode.setPrev(undefined);
        }

        newNode.setNext(undefined);
    }

    pop(){
        if(this.head !== undefined){
            let result = this.head;
            this.head = this.head.next;
            if(this.head != undefined){
                this.head.setPrev(undefined);
            } else {
                this.tail = undefined;
            }
            result.setNext(undefined);
            result.setPrev(undefined);
            return result;
        }
        return undefined;
    }

    remove(node: LinkedListNode){
        if(node.prev === undefined && node.next === undefined){
            this.head = undefined;
            this.tail = undefined;
        } else {
            if(node.prev !== undefined){
                node.prev.setNext(node.next)
            } else {
                this.head = this.head.next;
            }
            if(node.next !== undefined){
                node.next.setPrev(node.prev);
            } else {
                this.tail = this.tail.prev;
            }
        }
    }
}

class LRUCache {
    counter: number;
    cacheSize: number;
    map: Map<string, LinkedListNode>;
    list: DoubleLinkedList;

    constructor(size: number){
        this.cacheSize = size;
        this.counter = 0;
        this.list = new DoubleLinkedList();
        this.map = new Map<string, LinkedListNode>();
    }

    add(key: string | number, val: any){
        if(this.counter === this.cacheSize){
            this.remove();
        }
        let stringKey = key.toString();
        

        if(!this.map.has(stringKey)){
            let newNode:LinkedListNode = new LinkedListNode(stringKey, val);
            this.map.set(stringKey, newNode);
            this.list.add(newNode);
            this.counter++;
        }else{
            this.updateLRU(this.map.get(stringKey));
        }
    }

    remove(){
        let nodeToRemove = this.list.pop();
        if(nodeToRemove !== undefined){
            this.map.delete(nodeToRemove.key);
            this.counter--;
        }
    }

    updateLRU(updateNode: LinkedListNode){
        this.list.remove(updateNode);
        this.list.add(updateNode);
    }

    update(key: string | number, val: any){
        let stringKey = key.toString();
        if(this.map.has(stringKey)){
            let result = this.map.get(stringKey);
            result.value = val;
            this.updateLRU(result);
        }
    }

    read(key: string | number){
        let stringKey = key.toString();
        if(this.map.has(stringKey)){
            let result = this.map.get(stringKey);
            this.updateLRU(result);
            return result.value;
        }
        return undefined;
    }

    delete(key: string | number){
        let stringKey = key.toString();
        if(this.map.has(stringKey)){
            let result = this.map.get(stringKey);
            this.list.remove(result);
            this.map.delete(stringKey);
            return true;
        }
        return false;
    }
}

function testLRUCache(){
    let t: LRUCache = new LRUCache(3);
    t.add("test", 1);
    t.add(2, 2);
    t.add("3", 3);
   //console.log(t.map); //test, 2, 3

    console.assert(2, t.read(2));

    //console.log(t.map); // test, 3, 2
    console.assert(1, t.read("test"));
    //console.log(t.map); // 3, 2, test
    t.update("test", 4);
    //console.log(t.map) // 3, 2, test
    console.assert(4, t.read("test"));

    t.add("4", 4);  
    //console.log(t.map) // 2, test, 4

    if(t.read("3") !== undefined){
        console.error('Failed to remove a node when exceeding cache size');
    }
    console.assert(4, t.read("4"));

    t.delete("4");

    if(t.read("4") !== undefined){
        console.error('Failed to remove a node when exceeding cache size');
    }
}

testLRUCache();