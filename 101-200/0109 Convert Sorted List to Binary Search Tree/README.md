---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Divide and Conquer
  - Tree
  - Binary Search Tree
  - Binary Tree
---

# 109. Convert Sorted List to Binary Search Tree

**[View Problem on LeetCode](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0109` (`109`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Divide and Conquer`, `Tree`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a singly linked list whose node values are sorted in strictly/weakly ascending order, convert the list into a **height-balanced Binary Search Tree (BST)** and return its root.

A binary tree is height-balanced if, for every node in the tree, the heights of its left and right subtrees differ by no more than `1`.

---

## Examples

### Example 1

```text
Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the shown height balanced BST.
```

### Example 2

```text
Input: head = []
Output: []
```

---

## Constraints

- The number of nodes in `head` is in the range `[0, 2 * 10^4]`.

- `-10^5 <= Node.val <= 10^5`

---

## Problem Understanding

- In a sorted sequence, picking the middle element as the root places an equal (or differing by at most `1`) number of smaller elements in the left subtree and larger elements in the right subtree — guaranteeing both the **BST ordering property** and **height balance** recursively.
- Unlike a sorted array, a singly linked list does not support `O(1)` random access to the middle node.
- Converting the linked list into an `ArrayList` first trades `O(n)` extra memory for instant `O(1)` index lookups during recursive tree construction.

---

## Approach

### Brute Force Approach

Inserting the sorted linked list nodes one by one into a naive unbalanced BST creates a degenerate right-skewed chain of height `n` (violating height balance). Alternatively, finding the middle of each linked-list segment repeatedly with slow/fast pointers without copying takes `O(n log n)` time because each of the `O(log n)` recursion levels scans `O(n)` list pointers.

### Optimized Approach

Copy the sorted linked-list values into an `ArrayList<Integer> nums` in one pass, then recursively build the balanced BST via divide-and-conquer (`buildBST(nums, start, end)`) in `O(n)` time.

### Step-by-Step Thinking Process

1. Traverse the singly linked list from `head` to `null` and append every `head.val` into `ArrayList<Integer> nums`.
2. Define recursive helper `buildBST(nums, start, end)` to build a balanced BST over subarray `nums[start .. end]`.
3. Base case: when `start > end`, the subarray is empty, so return `null`.
4. Compute the midpoint `mid = (start + end) >> 1` and instantiate `TreeNode root = new TreeNode(nums.get(mid))`.
5. Recursively assign `root.left = buildBST(nums, start, mid - 1)` and `root.right = buildBST(nums, mid + 1, end)`, then return `root`.

### Algorithm / Intuition

In `sortedListToBST(ListNode head)`:
- The `for (; head != null; head = head.next)` loop flattens the linked list into `List<Integer> nums`, unlocking `O(1)` random access via `nums.get(mid)`.
- In `buildBST(nums, start, end)`, `int mid = (start + end) >> 1;` picks the lower-middle index (safe from overflow here since `nums.size() <= 2 * 10^4`).
- Because `start .. mid - 1` and `mid + 1 .. end` differ in length by at most `1` at every recursive split, every subtree is guaranteed to be height-balanced while preserving ascending BST order.

---

## Dry Run

Tracing Example 1 with `head = [-10, -3, 0, 5, 9]`:

1. **Flatten list:** `nums = [-10, -3, 0, 5, 9]` (`size = 5`).
2. **`buildBST(nums, 0, 4)`:** `mid = (0 + 4) >> 1 = 2` -> `root = Node(0)`
   - **Left `buildBST(nums, 0, 1)`:** `mid = (0 + 1) >> 1 = 0` -> `Node(-10)`
     - Left `buildBST(0, -1)` -> `null`
     - Right `buildBST(1, 1)` -> `mid = 1` -> `Node(-3)` (leaf)
   - **Right `buildBST(nums, 3, 4)`:** `mid = (3 + 4) >> 1 = 3` -> `Node(5)`
     - Left `buildBST(3, 2)` -> `null`
     - Right `buildBST(4, 4)` -> `mid = 4` -> `Node(9)` (leaf)
3. Resulting height-balanced BST has root `0`, left subtree `-10 -> right: -3`, and right subtree `5 -> right: 9` (note: LeetCode accepts any valid height-balanced BST, whether lower-mid or upper-mid is chosen).

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Scanning the linked list takes `O(n)` time, and `buildBST` creates each of the `n` `TreeNode`s in `O(1)` time.
- **Space Complexity:** `O(n)` — `ArrayList<Integer> nums` stores `n` integers (`O(n)` auxiliary memory), alongside `O(log n)` recursion stack frames.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [109convert-sorted-list-to-binary-search-tree.java](./109convert-sorted-list-to-binary-search-tree.java) |

---

## Key Learnings

- Copying a linked structure into a contiguous `ArrayList` reduces divide-and-conquer midpoint queries from `O(n)` per level (`O(n log n)` total) down to `O(1)` (`O(n)` total).
- Both lower-midpoint `(start + end) >> 1` and upper-midpoint `(start + end + 1) >> 1` produce valid height-balanced BSTs on sorted arrays.
- If `O(log n)` auxiliary space (excluding output tree nodes) is ever required, you can simulate an inorder traversal while advancing a global `ListNode` pointer in lockstep.
