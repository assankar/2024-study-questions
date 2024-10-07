export class TreeNode{
    value: number;
    left: TreeNode;
    right: TreeNode;

    constructor(val?: number, left?: TreeNode, right?: TreeNode){
        if(val === undefined){
            this.value = null;
        } else {
            this.value = val;
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

function BinarySearchTree(arr:number [], start: number, end: number, root: TreeNode){
    if(start > end || start < 0 || end >= arr.length){
        return null;
    }
    let middle = Math.floor((start+end)/2);
    if (root === null){
        root = new TreeNode(arr[middle]);
    }
    
    root.left = BinarySearchTree(arr, start, middle-1, root.left)
    root.right = BinarySearchTree(arr, middle+1, end, root.right);

    return root;
}

function isValidBST(root: TreeNode){
    if(root === undefined || root === null){
        return true;
    }

    let left = true;
    let right = true;

    if(root.left !== undefined && root.left !== null){
        left = root.left.value <= root.value;
    }
    if(root.right !== undefined && root.right !== null){
        right = root.right.value >= root.value;
    }

    return left && right && isValidBST(root.left) && isValidBST(root.right);
}

function testBinarySearchTree(){
    //First 2 are not balanced binary search trees.
    const arr: number[] = [1,2,3,4,5,6,10,7,9,8];
    const arr2: number[] = [2,4,5,6,7];
    //Third one is balanced binary search tree. 
    const arr3:number[] = [1,2,3];

    let len = arr.length;
    let root: TreeNode = BinarySearchTree(arr, 0, len-1, null);

    console.assert(true, isValidBST(root));

    let len2 = arr2.length;
    let root2 = BinarySearchTree(arr2, 0, len2-1, null);

    console.assert(true, isValidBST(root2));

    let len3 = arr3.length;
    let root3 = BinarySearchTree(arr3, 0, len3-1, null);

    console.assert(true, isValidBST(root3));
}

testBinarySearchTree();