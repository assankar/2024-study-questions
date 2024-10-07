import * as fs from 'fs';
const input = fs.readFileSync('words_alpha.txt', 'utf-8');

class TrieNode {
    val: string; 
    children: Map<string, TrieNode>;
    setOfValidWords: Set<string>;

    constructor(value?: string, child?: TrieNode){
        if(this.val !== undefined){
            this.val = value;
        }
        this.children = new Map<string, TrieNode>;
        this.setOfValidWords = new Set<string>;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    add(newWord: string){
        let pointer = this.root;

        for(let i = 0; i < newWord.length; i++){
            if(pointer.children.has(newWord[i])){
                pointer.setOfValidWords.add(newWord);
                pointer = pointer.children.get(newWord[i]);
            } else {
                let temp = new TrieNode(newWord[i]);
                pointer.children.set(newWord[i], temp);
                pointer.setOfValidWords.add(newWord);
                pointer = temp;
            }
        }
    }

    search(searchWord: string){
        let pointer = this.root;

        for(let i = 0; i < searchWord.length; i++){
            if(pointer.children.has(searchWord[i])){
                if(pointer.children.get(searchWord[i]).setOfValidWords.size !== 0){
                    pointer = pointer.children.get(searchWord[i]);                    
                } else {
                    return pointer.setOfValidWords;
                }
            } else {
                return new Set<string>();
            }
        }

        return pointer.setOfValidWords;
    }
}

function testOrkes(){
    let test1 = new Trie();

    const words:string[] = input.split('\n');
    for(let word of words){
        test1.add(word);
    }

    console.log(test1.search('aah'));
}

testOrkes();