# ts-avl-tree

[![Build Status](https://travis-ci.org/gwtw/ts-avl-tree.svg?branch=master)](http://travis-ci.org/gwtw/ts-avl-tree)
[![Coverage Status](https://coveralls.io/repos/github/gwtw/ts-avl-tree/badge.svg?branch=master)](https://coveralls.io/github/gwtw/ts-avl-tree?branch=master)

A TypeScript implementation of the [AVL tree](http://www.growingwiththeweb.com/data-structures/avl-tree/overview/) data structure.

![](http://www.growingwiththeweb.com/images/data-structures/avl-tree/avl-tree.svg)

## Features

- 100% test coverage
- Supports all common tree operations

## Install

```bash
npm install --save @tyriar/avl-tree
```

## Usage

See the [typings file](./typings/avl-tree.d.ts) for the full API.

```typescript
// Import npm module
import { AvlTree } from '@tyriar/avl-tree';

// Construct AvlTree
const tree = new AvlTree<number, number>();

// Insert keys
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
console.log('size: ' + tree.size);
console.log('contains 2: ' + tree.contains(2));
console.log('contains 7: ' + tree.contains(7));
// > size: 5
// > contains 2: true
// > contains 7: false

// Delete a key
tree.delete(2);
console.log('size: ' + tree.size);
console.log('contains 2: ' + tree.contains(2));
// > size: 4
// > contains 2: false

// Construct custom compare AvlTree
const tree2 = new AvlTree<string, string>(function (a, b) {
  return a.localeCompare(b);
});
tree2.insert('a');
tree2.insert('A');
tree2.insert('b');
tree2.insert('B');

// Delete the minimum key
const minKey = tree2.findMinimum();
tree2.delete(minKey);
console.log('minKey: ' + minKey);
console.log('new minKey: ' + tree2.findMinimum());
// > min key: 'a'
// > new min key: 'A'
```

## Operation time complexity

| Operation   | Complexity |
| ----------- | ---------- |
| contains    | O(log n)   |
| delete      | O(log n)   |
| findMaximum | O(log n)   |
| findMinimum | O(log n)   |
| get         | O(log n)   |
| insert      | O(log n)   |
| isEmpty     | Θ(1)       |
| size        | Θ(1)       |
