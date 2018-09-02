import { assert } from 'chai';
import { TestAvlTree } from './testUtils';

describe('findMaximum', () => {
  it('should return null when the tree is empty', () => {
    const tree = new TestAvlTree();
    assert.equal(tree.findMaximum(), null);
  });

  it('should return the maximum key in the tree', () => {
    const tree = new TestAvlTree();
    tree.insert(3);
    tree.insert(5);
    tree.insert(1);
    tree.insert(4);
    tree.insert(2);
    assert.equal(tree.findMaximum(), 5);
  });
});
