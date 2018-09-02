import { assert } from 'chai';
import { TestAvlTree } from './testUtils';

describe('get', () => {
  it('should return the correct values', () => {
    const tree = new TestAvlTree();
    tree.insert(1, 4);
    tree.insert(2, 5);
    tree.insert(3, 6);
    assert.equal(tree.get(1), 4);
    assert.equal(tree.get(2), 5);
    assert.equal(tree.get(3), 6);
  });

  it('should return null when the value doesn\'t exist', () => {
    const tree = new TestAvlTree();
    assert.equal(tree.get(1), null);
    assert.equal(tree.get(2), null);
    assert.equal(tree.get(3), null);
    tree.insert(1, 4);
    tree.insert(2, 5);
    tree.insert(3, 6);
    assert.equal(tree.get(4), null);
    assert.equal(tree.get(5), null);
    assert.equal(tree.get(6), null);
  });
});
