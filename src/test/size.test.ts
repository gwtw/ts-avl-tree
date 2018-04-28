import { assert } from 'chai';
import { TestAvlTree } from './testUtils';

describe('size', () => {
  it('should return the size of the tree', () => {
    const tree = new TestAvlTree();
    assert.equal(tree.size, 0);
    tree.insert(1);
    assert.equal(tree.size, 1);
    tree.insert(2);
    assert.equal(tree.size, 2);
    tree.insert(3);
    assert.equal(tree.size, 3);
    tree.insert(4);
    assert.equal(tree.size, 4);
    tree.insert(5);
    assert.equal(tree.size, 5);
    tree.insert(6);
    assert.equal(tree.size, 6);
    tree.insert(7);
    assert.equal(tree.size, 7);
    tree.insert(8);
    assert.equal(tree.size, 8);
    tree.insert(9);
    assert.equal(tree.size, 9);
    tree.insert(10);
    assert.equal(tree.size, 10);
  });
});
