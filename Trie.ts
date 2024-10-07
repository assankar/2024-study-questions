class TNode {
    value: string;
    map: Map<string, TNode>;
    set: Set<string>

    constructor(val?: string){
        if(val !== undefined){
            this.value = val;
        }
        this.map = new Map<string, TNode>();
        this.set = new Set<string>();
    }
}

class Trie {
    root: TNode;

    constructor(){
        this.root = new TNode();
    }

    add(newWord: string){
        let pointerNode = this.root;

        for(let s of newWord){
            if (pointerNode.map.has(s)){
                pointerNode = pointerNode.map.get(s);
            } else {
                let temp = new TNode(s);
                pointerNode.map.set(s, temp);
                pointerNode = temp;
            }
        }

        pointerNode.set.add(newWord);
    }

    has(word: string){
        let pointerNode = this.root;

        for(let s of word){
            if(pointerNode.map.has(s)){
                if(pointerNode.map.get(s).set.size !== 0){
                    pointerNode = pointerNode.map.get(s);
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        if (pointerNode.set.has(word)){
            return true;
        }

        return false;
    }
}



function testTrie(){
    let test1 = new Trie();
    test1.add("saturday");
    test1.add("sunday");
    test1.add("sun");
    test1.add("sat");

    console.assert(true, test1.has("sun"));
    console.assert(true, test1.has("sunday"));
    console.assert(true, test1.has("sat"));
    console.assert(true, test1.has("saturday"));

    if(test1.has("monday")){
        console.log('error');
    }
    console.log(test1.root.map);
}

testTrie();