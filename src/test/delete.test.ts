import { assert } from 'chai';
import { TestAvlTree } from './testUtils';

describe('delete', () => {
  it('should not change the size of a tree with no root', () => {
    const tree = new TestAvlTree();
    tree.delete(1);
    assert.equal(tree.size, 0);
  });

  it('should delete a single key', () => {
    const tree = new TestAvlTree();
    tree.insert(1);
    tree.delete(1);
    assert.isTrue(tree.isEmpty);
  });

  /**
   *       _4_                       _2_
   *      /   \                     /   \
   *     2     6  -> delete(6) ->  1     4
   *    / \                             /
   *   1   3                           3
   */
  it('should correctly balance the left left case', () => {
    const tree = new TestAvlTree();
    tree.insert(4, 4);
    tree.insert(2, 2);
    tree.insert(6, 6);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.insert(1, 1);
    tree.insert(7, 7);
    tree.delete(7);
    tree.delete(5);
    tree.delete(6);
    assert.equal(tree.root.key, 2);
    assert.equal(tree.root.value, 2);
    assert.equal(tree.root.left.key, 1);
    assert.equal(tree.root.left.value, 1);
    assert.equal(tree.root.right.key, 4);
    assert.equal(tree.root.right.value, 4);
    assert.equal(tree.root.right.left.key, 3);
    assert.equal(tree.root.right.left.value, 3);
  });

  /**
   *       _4_                       _6_
   *      /   \                     /   \
   *     2     6  -> delete(2) ->  4     7
   *          / \                   \
   *         5   7                  5
   */
  it('should correctly balance the right right case', () => {
    const tree = new TestAvlTree();
    tree.insert(4, 4);
    tree.insert(2, 2);
    tree.insert(6, 6);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.insert(1, 1);
    tree.insert(7, 7);
    tree.delete(1);
    tree.delete(3);
    tree.delete(2);
    assert.equal(tree.root.key, 6);
    assert.equal(tree.root.value, 6);
    assert.equal(tree.root.left.key, 4);
    assert.equal(tree.root.left.value, 4);
    assert.equal(tree.root.left.right.key, 5);
    assert.equal(tree.root.left.right.value, 5);
    assert.equal(tree.root.right.key, 7);
    assert.equal(tree.root.right.value, 7);
  });

  /**
   *       _6_                       _4_
   *      /   \                     /   \
   *     2     7  -> delete(8) ->  2     6
   *    / \     \                 / \   / \
   *   1   4     8               1   3 5   7
   *      / \
   *     3   5
   */
  it('should correctly balance the left right case', () => {
    const tree = new TestAvlTree();
    tree.insert(6, 6);
    tree.insert(2, 2);
    tree.insert(7, 7);
    tree.insert(1, 1);
    tree.insert(8, 8);
    tree.insert(4, 4);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.delete(8);
    assert.equal(tree.root.key, 4);
    assert.equal(tree.root.value, 4);
    assert.equal(tree.root.left.key, 2);
    assert.equal(tree.root.left.value, 2);
    assert.equal(tree.root.left.left.key, 1);
    assert.equal(tree.root.left.left.value, 1);
    assert.equal(tree.root.left.right.key, 3);
    assert.equal(tree.root.left.right.value, 3);
    assert.equal(tree.root.right.key, 6);
    assert.equal(tree.root.right.value, 6);
    assert.equal(tree.root.right.left.key, 5);
    assert.equal(tree.root.right.left.value, 5);
    assert.equal(tree.root.right.right.key, 7);
    assert.equal(tree.root.right.right.value, 7);
  });

  /**
   *       _3_                       _5_
   *      /   \                     /   \
   *     2     7  -> delete(1) ->  3     7
   *    /     / \                 / \   / \
   *   1     5   8               2   4 6   8
   *        / \
   *       4   6
   */
  it('should correctly balance the right left case', () => {
    const tree = new TestAvlTree();
    tree.insert(3, 3);
    tree.insert(2, 2);
    tree.insert(7, 7);
    tree.insert(1, 1);
    tree.insert(8, 8);
    tree.insert(5, 5);
    tree.insert(4, 4);
    tree.insert(6, 6);
    tree.delete(1);
    assert.equal(tree.root.key, 5);
    assert.equal(tree.root.value, 5);
    assert.equal(tree.root.left.key, 3);
    assert.equal(tree.root.left.value, 3);
    assert.equal(tree.root.left.left.key, 2);
    assert.equal(tree.root.left.left.value, 2);
    assert.equal(tree.root.left.right.key, 4);
    assert.equal(tree.root.left.right.value, 4);
    assert.equal(tree.root.right.key, 7);
    assert.equal(tree.root.right.value, 7);
    assert.equal(tree.root.right.left.key, 6);
    assert.equal(tree.root.right.left.value, 6);
    assert.equal(tree.root.right.right.key, 8);
    assert.equal(tree.root.right.right.value, 8);
  });

  it('should take the right child if the left does not exist', () => {
    const tree = new TestAvlTree();
    tree.insert(1, 1);
    tree.insert(2, 2);
    tree.delete(1);
    assert.equal(tree.root.key, 2);
    assert.equal(tree.root.value, 2);
  });

  it('should take the left child if the right does not exist', () => {
    const tree = new TestAvlTree();
    tree.insert(2, 2);
    tree.insert(1, 1);
    tree.delete(2);
    assert.equal(tree.root.key, 1);
    assert.equal(tree.root.value, 1);
  });

  it('should get the right child if the node has 2 leaf children', () => {
    const tree = new TestAvlTree();
    tree.insert(2, 2);
    tree.insert(1, 1);
    tree.insert(3, 3);
    tree.delete(2);
    assert.equal(tree.root.key, 3);
    assert.equal(tree.root.value, 3);
  });

  it('should get the in-order successor if the node has both children', () => {
    const tree = new TestAvlTree();
    tree.insert(2, 2);
    tree.insert(1, 1);
    tree.insert(4, 4);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.delete(2);
    assert.equal(tree.root.key, 3);
    assert.equal(tree.root.value, 3);
  });
});
