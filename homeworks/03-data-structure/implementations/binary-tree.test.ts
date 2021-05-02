import {TreeNode} from "../models/tree-node";
import {BinaryTree} from "./binary-tree";
import {TraverseType} from "../models/traverse-type";

const treeValues = [1, 2, 3, 8, 4, 10, 7, 45, 6, 12, 16, 9];
const root = new TreeNode(5);
const tree = new BinaryTree(root);
treeValues.map(value => tree.insert(value))

test('should insert in binary tree', () => {
    const treeMock = {
        root: {
            value: 5,
            left: {
                value: 2,
                right: null,
                left: {
                    value: 1,
                    left: null,
                    right: null
                },
            },
            right: {
                value: 6,
                left: null,
                right: {
                    value: 7,
                    left: null,
                    right: null
                }
            }
        }
    }
    const root = new TreeNode(5);
    const tree = new BinaryTree(root);
    tree.insert(2, root).insert(1, root).insert(6, root).insert(7, root)
    expect(tree).toEqual(treeMock)
})

describe('should traverce binary tree ', () => {
    test('should InOrderDFS traverse', () => {
        expect(tree.traverse(TraverseType.InOrderDFS)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 45])
    })

    test('should PreOrderDFS traverse', () => {
        expect(tree.traverse(TraverseType.PreOrderDFS)).toEqual([5, 1, 2, 3, 4, 8, 7, 6, 10, 9, 45, 12, 16])
    })

    test('should PostOrderDFS traverse', () => {
        expect(tree.traverse(TraverseType.PostOrderDFS)).toEqual([4, 3, 2, 1, 6, 7, 9, 16, 12, 45, 10, 8, 5])
    })

    test('should BFS traverse', () => {
        expect(tree.traverse(TraverseType.BFS)).toEqual([5, 1, 8, 2, 7, 10, 3, 6, 9, 45, 4, 12, 16])
    })
})

test('should get column of binary tree ', () => {
    expect(tree.getColumn(-2)).toEqual([])
    expect(tree.getColumn(-1)).toEqual([1, 6])
    expect(tree.getColumn(0)).toEqual([5, 2, 7])
    expect(tree.getColumn(1)).toEqual([3, 8, 9])
    expect(tree.getColumn(2)).toEqual([4, 10, 12])
    expect(tree.getColumn(3)).toEqual([45, 16])
    expect(tree.getColumn(4)).toEqual([])
})

test('should set binary tree', () => {
    const tree = new BinaryTree(new TreeNode(4))
    const newTree = tree.setTree(new TreeNode<number>(5))
    expect(tree).toBe(newTree)
    expect(tree.getColumn(0)).toEqual(newTree.getColumn(0))
})