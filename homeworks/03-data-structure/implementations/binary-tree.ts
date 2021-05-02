import {IBinaryTree} from "../models/binary-tree";
import {TraverseType} from "../models/traverse-type";
import {TreeNode} from "../models/tree-node";

export class BinaryTree<T> implements IBinaryTree<T> {

    constructor(protected root: TreeNode<T>) {
    }

    setTree(tree: TreeNode<T>): this {
        this.root = tree;
        return this;
    }

    traverse(traverseType: TraverseType): T[] {
        if (traverseType === TraverseType.BFS) return this.bfs([this.root], []);

        return this.dfs(this.root, traverseType);
    }

    getColumn(columnOrder: number): T[] {
        return this.combineByLevel(columnOrder, 0, this.root);
    }

    insert(value: T, current?: TreeNode<T>) {
        const startNode = current || this.root;

        if (value < startNode.value) {
            if (startNode.left === null) {
                startNode.left = new TreeNode<T>(value);
                return this;
            } else {
                return this.insert(value, startNode.left);
            }
        } else if (value > startNode.value) {
            if (startNode.right === null) {
                startNode.right = new TreeNode<T>(value);
                return this;
            } else {
                return this.insert(value, startNode.right);
            }
        }
    };

    private bfs(traverseQueue: TreeNode<T>[], acc: T[]): T[] {
        if (!traverseQueue.length) return acc;

        const currentNode = traverseQueue.shift();
        const newQueue = [...traverseQueue, currentNode.left, currentNode.right].filter(value => !!value)
        return this.bfs(newQueue, [...acc, currentNode.value]);
    }

    private dfs(node: TreeNode<T> | null, traverseType: TraverseType): T[] {
        if (!node) return [];

        const left = this.dfs(node.left, traverseType);
        const right = this.dfs(node.right, traverseType);

        switch (traverseType) {
            case TraverseType.InOrderDFS:
                return [...left, node.value, ...right]
            case TraverseType.PreOrderDFS:
                return [node.value, ...left, ...right]
            case TraverseType.PostOrderDFS:
                return [...left, ...right, node.value]
        }
    }

    private combineByLevel(columnOrder: number, currentColumn: number, node: TreeNode<T> | null): T[] {
        if (!node) return [];

        const currentNode = currentColumn === columnOrder ? [node.value] : [];
        return [
            ...currentNode,
            ...this.combineByLevel(columnOrder, currentColumn - 1, node.left),
            ...this.combineByLevel(columnOrder, currentColumn + 1, node.right)
        ];
    }
}