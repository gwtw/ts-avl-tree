import { assert } from 'chai';
import { TestAvlTree } from './testUtils';

describe('contains', () => {
  it('should return false if the tree is empty', () => {
    const tree = new TestAvlTree();
    assert.isFalse(tree.contains(1));
  });

  it('should return whether the tree contains a node', () => {
    const tree = new TestAvlTree();
    assert.isFalse(tree.contains(1));
    assert.isFalse(tree.contains(2));
    assert.isFalse(tree.contains(3));
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    assert.isTrue(tree.contains(1));
    assert.isTrue(tree.contains(2));
    assert.isTrue(tree.contains(3));
  });

  it('should return false when the expected parent has no children', () => {
    const tree = new TestAvlTree();
    tree.insert(2);
    assert.isFalse(tree.contains(1));
    assert.isFalse(tree.contains(3));
  });
});
