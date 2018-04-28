import { assert } from 'chai';
import { TestAvlTree } from './testUtils';

describe('Custom compare function', () => {
  it('should function correctly given a non-reverse customCompare', () => {
    const tree = new TestAvlTree<number, null>((a, b) => b - a);
    tree.insert(2);
    tree.insert(1);
    tree.insert(3);
    assert.equal(tree.size, 3);
    assert.equal(tree.findMinimum(), 3);
    assert.equal(tree.findMaximum(), 1);
    tree.delete(3);
    assert.equal(tree.size, 2);
    assert.equal(tree.root.key, 2);
    assert.equal(tree.root.left, null);
    assert.equal(tree.root.right.key, 1);
  });

  it('should work when the key is a complex object', () => {
    interface IComplexObject {
      innerKey: number;
    }
    const tree = new TestAvlTree<IComplexObject, null>((a, b) => a.innerKey - b.innerKey);
    tree.insert({innerKey: 1});
    assert.isTrue(tree.contains({innerKey: 1}));
    assert.isFalse(tree.contains({innerKey: 2}));
  });
});
