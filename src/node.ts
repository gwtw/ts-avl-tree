/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */

export class Node<K, V> {
  public left: Node<K, V> = null;
  public right: Node<K, V> = null;
  public height: number = null;

  /**
   * Creates a new AVL Tree node.
   * @param key The key of the new node.
   * @param value The value of the new node.
   */
  constructor(
    public key: K,
    public value: V
  ) {
  }

  /**
   * Performs a right rotate on this node.
   * @return The root of the sub-tree; the node where this node used to be.
   */
  public rotateRight(): Node<K, V> {
    //     b                           a
    //    / \                         / \
    //   a   e -> b.rotateRight() -> c   b
    //  / \                             / \
    // c   d                           d   e
    const other = this.left;
    this.left = other.right;
    other.right = this;
    this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
    other.height = Math.max(other.leftHeight, this.height) + 1;
    return other;
  }

  /**
   * Performs a left rotate on this node.
   * @return The root of the sub-tree; the node where this node used to be.
   */
  public rotateLeft(): Node<K, V> {
    //   a                              b
    //  / \                            / \
    // c   b   -> a.rotateLeft() ->   a   e
    //    / \                        / \
    //   d   e                      c   d
    const other = this.right;
    this.right = other.left;
    other.left = this;
    this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
    other.height = Math.max(other.rightHeight, this.height) + 1;
    return other;
  }

  /**
   * Convenience function to get the height of the left child of the node,
   * returning -1 if the node is null.
   * @return The height of the left child, or -1 if it doesn't exist.
   */
  public get leftHeight(): number {
    if (!this.left) {
      return -1;
    }
    return this.left.height;
  }

  /**
   * Convenience function to get the height of the right child of the node,
   * returning -1 if the node is null.
   * @return The height of the right child, or -1 if it doesn't exist.
   */
  public get rightHeight(): number {
    if (!this.right) {
      return -1;
    }
    return this.right.height;
  }
}
