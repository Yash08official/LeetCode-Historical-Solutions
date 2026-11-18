---
comments: true
difficulty: Medium
tags:
  - Stack
  - Tree
  - Design
  - Binary Search Tree
  - Binary Tree
  - Iterator
---

# 173. Binary Search Tree Iterator

**[View Problem on LeetCode](https://leetcode.com/problems/binary-search-tree-iterator/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0173` (`173`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Stack`, `Tree`, `Design`, `Binary Search Tree`, `Binary Tree`, `Iterator` |
| **Solution Language** | JavaScript |

---

## Problem Description

Implement the `BSTIterator` class that represents an iterator over the **in-order traversal** of a binary search tree (BST):

	
- `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
	
- `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.
	
- `int next()` Moves the pointer to the right, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return the smallest element in the BST.

You may assume that `next()` calls will always be valid. That is, there will be at least a next number in the in-order traversal when `next()` is called.

---

## Examples

### Example 1

```text
**Input**
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
**Output**
[null, 3, 7, true, 9, true, 15, true, 20, false]

**Explanation**
BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
bSTIterator.next();    // return 3
bSTIterator.next();    // return 7
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 9
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 15
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 20
bSTIterator.hasNext(); // return False
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is in the range `[1, 10^5]`.
	
- `0 <= Node.val <= 10^6`
	
- At most `10^5` calls will be made to `hasNext`, and `next`.

 

**Follow up:**

	
- Could you implement `next()` and `hasNext()` to run in average `O(1)` time and use `O(h)` memory, where `h` is the height of the tree?

---

## Problem Understanding

- Implement an iterator over the in-order traversal of a binary search tree (BST).
- `next()` and `hasNext()` should run in average $O(1)$ time and use $O(h)$ memory, where $h$ is tree height.

---

## Approach

### Optimized Approach (Controlled Controlled Stack In-Order Traversal)

1. Maintain an internal stack `stack = []`.
2. In constructor, push all nodes along the left spine from `root` down to the leftmost leaf (`pushLeft(root)`).
3. `hasNext()`:
   - Return `this.stack.length > 0`.
4. `next()`:
   - Pop node from `stack` (this node is guaranteed to be the next smallest element in in-order sequence).
   - If the popped node has a right child, push all left descendents of that right child (`pushLeft(node.right)`).
   - Return `node.val`.

---

## Complexity Analysis

- **Time Complexity:** Average $O(1)$ amortized for `next()`, $O(1)$ for `hasNext()`. Each tree node is pushed and popped exactly once across the full traversal.
- **Space Complexity:** $O(h)$ — Stack holds at most $h$ nodes at any point, where $h$ is BST height.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [173binary-search-tree-iterator.js](./173binary-search-tree-iterator.js) |

---

## Key Learnings

- Simulating recursive in-order traversal with an explicit stack allows pausing and resuming iteration lazily on demand while maintaining strict $O(h)$ memory bounds.
