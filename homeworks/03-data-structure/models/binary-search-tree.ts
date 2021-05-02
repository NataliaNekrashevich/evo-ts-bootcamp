import {IBinaryTree} from "./binary-tree";

export interface IBinarySearchTree<T> extends IBinaryTree<T> {
    has(value: T): boolean;
}