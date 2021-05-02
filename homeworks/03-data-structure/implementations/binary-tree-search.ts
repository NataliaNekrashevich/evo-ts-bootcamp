import {BinaryTree} from "./binary-tree";
import {IBinarySearchTree} from "../models/binary-search-tree";
import {TreeNode} from "../models/tree-node";

export class BinarySearchTree extends BinaryTree<number> implements IBinarySearchTree<number> {

    constructor(private tree: TreeNode<number>) {
        super(tree)
    }

    has(value: number): boolean {
        return this.find(this.root, value)
    }

    private find(node: TreeNode<number>, value: number): boolean {
        if (value < node.value) {
            return node.left ? this.find(node.left, value) : false
        }

        if (value > node.value) {
            return node.right ? this.find(node.right, value) : false
        }

        return true
    }
}