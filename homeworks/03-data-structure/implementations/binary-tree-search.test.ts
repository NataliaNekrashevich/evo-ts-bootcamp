import {TreeNode} from "../models/tree-node";
import {BinarySearchTree} from "./binary-tree-search";

const treeValues = [1, 2, 3, 8, 4, 10, 7, 45, 6, 12, 16, 9];
const root = new TreeNode(5);
const tree = new BinarySearchTree(root);
treeValues.map(value => tree.insert(value))

test('binary search tree - has', () => {
    expect(tree.has(5)).toBe(true)
    expect(tree.has(45)).toBe(true)
    expect(tree.has(-8)).toBe(false)
    expect(tree.has(20)).toBe(false)
})