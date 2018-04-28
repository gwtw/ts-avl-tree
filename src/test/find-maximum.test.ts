import { assert } from 'chai';
import { TestAvlTree } from './testUtils';

describe('findMaximum', () => {
  it('should return the maximum key in the tree', () => {
    const tree = new TestAvlTree();
    tree.insert(3, null);
    tree.insert(5, null);
    tree.insert(1, null);
    tree.insert(4, null);
    tree.insert(2, null);
    assert.equal(tree.findMaximum(), 5);
  });
});
