export class TreeNode<T> {
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(public value: T) {
        this.left = null;
        this.right = null;
    }
}