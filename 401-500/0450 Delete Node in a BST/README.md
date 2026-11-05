---
comments: true
difficulty: Medium
tags:
  - Tree
  - Binary Search Tree
  - Binary Tree
---

# 450. Delete Node in a BST

**[View Problem on LeetCode](https://leetcode.com/problems/delete-node-in-a-bst/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0450` (`450`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `root` of a valid Binary Search Tree (BST) with unique node values and a target `key`, remove the node whose value equals `key` (if present) while preserving the BST ordering property.

Return the root reference of the resulting BST (which may change if the deleted node was the original root). If `key` does not exist in the tree, return the tree unchanged.

---

## Examples

### Example 1

```text
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.
```

### Example 2

```text
Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value = 0.
```

### Example 3

```text
Input: root = [], key = 0
Output: []
```

---

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`.

- `-10^5 <= Node.val <= 10^5`

- Each node has a **unique** value.

- `root` is a valid binary search tree.

- `-10^5 <= key <= 10^5`

---

## Follow-up Questions

Could you solve it with time complexity `O(height of tree)`?

The implemented recursive solution already achieves **`O(height of tree)` time complexity**: the search path from the root to the target node visits at most `d` edges, and finding the leftmost node `node` in `root.right` descends along a single path within that subtree of length at most `h - d`, for a total work bounded by `O(h)`. (To also reduce auxiliary space from `O(h)` recursion stack to `O(1)`, the initial search down to `key` can be written iteratively while tracking the parent reference.)

---

## Problem Understanding

- **BST ordering invariant:** For every node, all values in its left subtree are strictly smaller than `node.val`, and all values in its right subtree are strictly larger than `node.val`.
- **Deletion cases when `root.val === key`:**
  1. **No left child (`root.left === null`):** Replace the node directly with `root.right` (which also covers leaf nodes when `root.right === null`).
  2. **No right child (`root.right === null`):** Replace the node directly with `root.left`.
  3. **Two children:** Every value in `root.left` is strictly smaller than every value in `root.right`. Therefore, `root.left` can be attached as the left child of the minimum node in `root.right` (the in-order successor), and `root.right` becomes the new subtree root.

---

## Approach

### Brute Force Approach

A naive approach performs an in-order traversal of the BST to collect all values except `key` into a sorted array, and then rebuilds a brand-new BST from scratch.

This visits every node in the tree even if the tree is balanced, taking `O(n)` time and `O(n)` extra space instead of exploiting the BST structure.

### Optimized Approach

Use **Recursive BST Search and Subtree Re-linking**: recursively descend left or right in `O(h)` steps to locate `key`, and if the target node has two children, splice `root.left` onto the leftmost node (in-order successor) of `root.right` before returning `root.right`.

### Step-by-Step Thinking Process

1. If `root === null`, `key` is absent; return `null`.
2. Compare `key` with `root.val`: if `root.val > key`, recursively delete from `root.left` and reattach; if `root.val < key`, recursively delete from `root.right` and reattach.
3. Once `root.val === key`, handle single-child/leaf cases immediately by returning whichever child is non-null (`root.right` when `root.left === null`, or `root.left` when `root.right === null`).
4. When both `root.left` and `root.right` exist, walk down `let node = root.right` via `while (node.left !== null) node = node.left` to locate the smallest node in the right subtree.
5. Attach `node.left = root.left` and promote `root.right` as the replacement root of this subtree.

### Algorithm / Intuition

In `deleteNode(root, key)`, recursive return values naturally update parent links (`root.left = deleteNode(...)` or `root.right = deleteNode(...)`) without needing explicit parent pointers.

When `root` itself matches `key` and has two children, many textbook implementations copy `node.val` into `root.val` and make a second recursive call `deleteNode(root.right, node.val)`. Instead, this solution performs a clean pointer splice:
1. `node` starts at `root.right` and follows `.left` pointers until `node.left === null`, stopping at the minimum element of the right subtree.
2. Because all keys in `root.left` are `< root.val < node.val`, setting `node.left = root.left` preserves valid BST order everywhere.
3. Setting `root = root.right` and returning `root` bypasses the deleted node in `O(1)` pointer updates.

---

## Dry Run

Tracing **Example 1** with `root = [5, 3, 6, 2, 4, null, 7]` and `key = 3`:

1. **Call `deleteNode(5, 3)`:** `5 > 3`, so execute `root.left = deleteNode(3, 3)`.
2. **Call `deleteNode(3, 3)`:** `root.val === 3` matches `key`.
   - `root.left` is node `2` (`!== null`), and `root.right` is node `4` (`!== null`).
   - Initialize `node = root.right` (node `4`).
   - Check `while (node.left !== null)`: node `4` has `left === null`, so the loop finishes with `node = 4`.
   - Attach `node.left = root.left` -> node `4.left` becomes node `2`.
   - Promote `root = root.right` (node `4`) and return node `4`.
3. **Back in `deleteNode(5, 3)`:** `5.left` is updated to node `4`. Return node `5`.

Resulting BST level-order representation: `[5, 4, 6, 2, null, null, 7]`.

---

## Complexity Analysis

- **Time Complexity:** `O(h)` — Where `h` is the height of the tree (`O(log n)` for a balanced BST, `O(n)` in the worst case for a skewed tree). Searching down to `key` takes `O(d)` steps, and walking to `node` takes at most `O(h - d)` steps.
- **Space Complexity:** `O(h)` — Due to the recursion call stack of depth at most `h`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [450delete-node-in-a-bst.js](./450delete-node-in-a-bst.js) |

---

## Key Learnings

- Returning the updated subtree root from recursive BST operations eliminates tedious parent-pointer bookkeeping, even when deleting the tree's root.
- Splicing `root.left` onto the leftmost node of `root.right` avoids a second recursive deletion pass while maintaining valid BST invariants.
- Note that splicing `root.left` under the successor can increase the tree's height by up to the height of `root.left` over repeated deletions, whereas value-replacement keeps subtree heights unchanged.
