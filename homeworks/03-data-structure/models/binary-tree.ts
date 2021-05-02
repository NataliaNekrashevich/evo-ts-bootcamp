import {TraverseType} from "./traverse-type";
import {TreeNode} from "./tree-node";

export interface IBinaryTree<T> {
    setTree(tree: TreeNode<T>): this;

    traverse(traverseType: TraverseType): T[];

    getColumn(columnOrder: number): T[];
}