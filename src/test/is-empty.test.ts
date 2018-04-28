import { assert } from 'chai';
import { TestAvlTree } from './testUtils';

describe('isEmpty', () => {
  it('should return whether the tree is empty', () => {
    const tree = new TestAvlTree();
    assert.isTrue(tree.isEmpty);
    tree.insert(1);
    assert.isFalse(tree.isEmpty);
    tree.delete(1);
    assert.isTrue(tree.isEmpty);
  });
});
