/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */
'use strict';

import { Node } from './node';

export type CompareFunction<K> = (a: K, b: K) => number;

export class AvlTree<K, V> {
  private _root: Node<K, V> = null;
  private _size: number = 0;

  /**
   * Creates a new AVL Tree.
   * @param customCompare An optional custom compare function.
   */
  constructor(
    private _compare?: CompareFunction<K>
  ) {
    if (!_compare) {
      this._compare = this._defaultCompare;
    }
  }

  /**
   * Compares two keys with each other.
   * @param a The first key to compare.
   * @param b The second key to compare.
   * @return -1, 0 or 1 if a < b, a == b or a > b respectively.
   */
  private _defaultCompare(a: K, b: K): number {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }

  /**
   * Inserts a new node with a specific key into the tree.
   *
   * @param key The key being inserted.
   * @param value The value being inserted.
   */
  public insert(key: K, value?: V) {
    this._root = this._insert(key, value, this._root);
    this._size++;
  }

  /**
   * Inserts a new node with a specific key into the tree.
   * @param key The key being inserted.
   * @param root The root of the tree to insert in.
   * @return The new tree root.
   */
  private _insert(key: K, value: V, root: Node<K, V>) {
    // Perform regular BST insertion
    if (root === null) {
      return new Node(key, value);
    }

    if (this._compare(key, root.key) < 0) {
      root.left = this._insert(key, value, root.left);
    } else if (this._compare(key, root.key) > 0) {
      root.right = this._insert(key, value, root.right);
    } else {
      // It's a duplicate so insertion failed, decrement size to make up for it
      this._size--;
      return root;
    }

    // Update height and rebalance tree
    root.height = Math.max(root.leftHeight, root.rightHeight) + 1;
    var balanceState = getBalanceState(root);

    if (balanceState === BalanceState.UNBALANCED_LEFT) {
      if (this._compare(key, root.left.key) < 0) {
        // Left left case
        root = root.rotateRight();
      } else {
        // Left right case
        root.left = root.left.rotateLeft();
        return root.rotateRight();
      }
    }

    if (balanceState === BalanceState.UNBALANCED_RIGHT) {
      if (this._compare(key, root.right.key) > 0) {
        // Right right case
        root = root.rotateLeft();
      } else {
        // Right left case
        root.right = root.right.rotateRight();
        return root.rotateLeft();
      }
    }

    return root;
  }

  /**
   * Deletes a node with a specific key from the tree.
   * @param key The key being deleted.
   */
  public delete(key: K) {
    this._root = this._delete(key, this._root);
    this._size--;
  }

  /**
   * Deletes a node with a specific key from the tree.
   * @param key The key being deleted.
   * @param root The root of the tree to delete from.
   * @return The new tree root.
   */
  private _delete(key: K, root: Node<K, V>): Node<K, V> {
    // Perform regular BST deletion
    if (root === null) {
      this._size++;
      return root;
    }

    if (this._compare(key, root.key) < 0) {
      // The key to be deleted is in the left sub-tree
      root.left = this._delete(key, root.left);
    } else if (this._compare(key, root.key) > 0) {
      // The key to be deleted is in the right sub-tree
      root.right = this._delete(key, root.right);
    } else {
      // root is the node to be deleted
      if (!root.left && !root.right) {
        root = null;
      } else if (!root.left && root.right) {
        root = root.right;
      } else if (root.left && !root.right) {
        root = root.left;
      } else {
        // Node has 2 children, get the in-order successor
        var inOrderSuccessor = minValueNode(root.right);
        root.key = inOrderSuccessor.key;
        root.value = inOrderSuccessor.value;
        root.right = this._delete(inOrderSuccessor.key, root.right);
      }
    }

    if (root === null) {
      return root;
    }

    // Update height and rebalance tree
    root.height = Math.max(root.leftHeight, root.rightHeight) + 1;
    var balanceState = getBalanceState(root);

    if (balanceState === BalanceState.UNBALANCED_LEFT) {
      // Left left case
      if (getBalanceState(root.left) === BalanceState.BALANCED ||
          getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
        return root.rotateRight();
      }
      // Left right case
      if (getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
        root.left = root.left.rotateLeft();
        return root.rotateRight();
      }
    }

    if (balanceState === BalanceState.UNBALANCED_RIGHT) {
      // Right right case
      if (getBalanceState(root.right) === BalanceState.BALANCED ||
          getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
        return root.rotateLeft();
      }
      // Right left case
      if (getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
        root.right = root.right.rotateRight();
        return root.rotateLeft();
      }
    }

    return root;
  }

  /**
   * Gets the value of a node within the tree with a specific key.
   * @param key The key being searched for.
   * @return The value of the node or null if it doesn't exist.
   */
  public get(key: K): V {
    if (this._root === null) {
      return null;
    }

    return this._get(key, this._root).value;
  }

  /**
   * Gets the value of a node within the tree with a specific key.
   * @param key The key being searched for.
   * @param root The root of the tree to search in.
   * @return The value of the node or null if it doesn't exist.
   */
  private _get(key: K, root: Node<K, V>): Node<K, V> {
    if (key === root.key) {
      return root;
    }

    if (this._compare(key, root.key) < 0) {
      if (!root.left) {
        return null;
      }
      return this._get(key, root.left);
    }

    if (!root.right) {
      return null;
    }
    return this._get(key, root.right);
  }

  /**
   * Gets whether a node with a specific key is within the tree.
   * @param key The key being searched for.
   * @return Whether a node with the key exists.
   */
  public contains(key: K): boolean {
    if (this._root === null) {
      return false;
    }

    return !!this._get(key, this._root);
  }

  /**
   * @return The minimum key in the tree.
   */
  public findMinimum(): K {
    return minValueNode(this._root).key;
  }

  /**
   * @return The maximum key in the tree.
   */
  public findMaximum(): K {
    return maxValueNode(this._root).key;
  }

  /**
   * @return The size of the tree.
   */
  public get size(): number {
    return this._size;
  }

  /**
   * @return {boolean} Whether the tree is empty.
   */
  public get isEmpty(): boolean {
    return this._size === 0;
  }
}

/**
 * Gets the minimum value node, rooted in a particular node.
 *
 * @private
 * @param {Node} root The node to search.
 * @return {Node} The node with the minimum key in the tree.
 */
function minValueNode(root) {
  var current = root;
  while (current.left) {
    current = current.left;
  }
  return current;
}

/**
 * Gets the maximum value node, rooted in a particular node.
 *
 * @private
 * @param {Node} root The node to search.
 * @return {Node} The node with the maximum key in the tree.
 */
function maxValueNode(root) {
  var current = root;
  while (current.right) {
    current = current.right;
  }
  return current;
}

/**
 * Represents how balanced a node's left and right children are.
 *
 * @private
 */
var BalanceState = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

/**
 * Gets the balance state of a node, indicating whether the left or right
 * sub-trees are unbalanced.
 *
 * @private
 * @param {Node} node The node to get the difference from.
 * @return {BalanceState} The BalanceState of the node.
 */
function getBalanceState(node) {
  var heightDifference = node.leftHeight() - node.rightHeight();
  switch (heightDifference) {
    case -2: return BalanceState.UNBALANCED_RIGHT;
    case -1: return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
    case 1: return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
    case 2: return BalanceState.UNBALANCED_LEFT;
    default: return BalanceState.BALANCED;
  }
}
