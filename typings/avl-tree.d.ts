/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */

declare module '@tyriar/avl-tree' {
  export type CompareFunction<K> = (a: K, b: K) => number;

  /**
   * An AVL tree data structure with a key and optional value.
   */
  export class AvlTree<K, V> {
    /**
     * Gets the size of the tree.
     */
    public size: number;

    /**
     * Gets whether the tree is empty.
     */
    public isEmpty: boolean;

    /**
     * Creates a new AVL Tree.
     * @param customCompare An optional custom compare function.
     */
    constructor(customCompare?: CompareFunction<K>);

    /**
     * Inserts a new node with a specific key into the tree.
     * @param key The key being inserted.
     * @param value The value being inserted.
     */
    public insert(key: K, value?: V): void;

    /**
     * Deletes a node with a specific key from the tree.
     * @param key The key being deleted.
     */
    public delete(key: K): void;

    /**
     * Gets the value of a node within the tree with a specific key.
     * @param key The key being searched for.
     * @return The value of the node (which may be undefined), or null if it
     * doesn't exist.
     */
    public get(key: K): V | undefined | null;

    /**
     * Gets whether a node with a specific key is within the tree.
     * @param key The key being searched for.
     * @return Whether a node with the key exists.
     */
    public contains(key: K): boolean;

    /**
     * @return The minimum key in the tree or null if there are no nodes.
     */
    public findMinimum(): K | null;

    /**
     * Gets the maximum key in the tree or null if there are no nodes.
     */
    public findMaximum(): K | null;
  }
}
