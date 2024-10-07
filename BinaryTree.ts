class LeafNode{
    val : number;
    left: LeafNode;
    right: LeafNode;

    constructor(val?: number, left?: LeafNode, right?: LeafNode){
        if(val === undefined){
            this.val = null;
        } else {
            this.val = val;
        }
        if(left === undefined){
            this.left = null;
        } else {
            this.left = left;
        }
        if(right === undefined){
            this.right = null;
        } else {
            this.right = right;
        }
    }

}

function createBinaryTree(arr: number[][]): LeafNode{
    let rootSet: Set<number> = new Set<number>();
    let treeMap: Map<number, LeafNode> = new Map<number, LeafNode>();

    for(let row of arr){
        let current : LeafNode;
        let parent : LeafNode;

        if(treeMap.has(row[1])){
            current = treeMap.get(row[1]);
        } else {
            current = new LeafNode(row[1], null, null);
            treeMap.set(row[1], current);
        }
        if(treeMap.has(row[0])){
            parent = treeMap.get(row[0]);
        } else {
            parent = new LeafNode(row[0], null, null);
            treeMap.set(row[0], parent);
            rootSet.add(row[0]);
        }

        if(rootSet.has(row[1])){
            rootSet.delete(row[1]);
        }
        if(row[2] == 1){
            parent.left = current;
        } else {
            parent.right = current;
        }
    }

    for(let key of rootSet){
        return treeMap.get(key);
    }
    return null;
}

function testCreateBinaryTree() {
    /* Given a 2 dimension array with values
       [parent, current, isLeft]
        Create the binary tree and return the root Node

        Ex// [[2, 5, 0], [1, 2, 1], [1, 3, 0]] should return 1. 
    */
    let testA = [[2, 5, 0], [1, 2, 1], [1, 3, 0]]
    const rootTreeNodeA: LeafNode = createBinaryTree(testA);
    console.log(`The Value of the root node is ${rootTreeNodeA.val} and should return 1`);
    console.log(rootTreeNodeA);

};

testCreateBinaryTree();