import { AvlTree } from '../avlTree';
import { Node } from '../node';

export class TestAvlTree<K, V> extends AvlTree<K, V> {
    public get root(): Node<K, V> { return this._root; }
}