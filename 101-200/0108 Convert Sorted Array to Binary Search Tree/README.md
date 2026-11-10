---
comments: true
difficulty: Easy
tags:
  - Array
  - Divide and Conquer
  - Tree
  - Binary Search Tree
  - Binary Tree
---

# 108. Convert Sorted Array to Binary Search Tree

**[View Problem on LeetCode](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0108` (`108`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Divide and Conquer`, `Tree`, `Binary Search Tree`, `Binary Tree` |
| **Solution Language** | Python 3 |

---

## Problem Description

Given an integer array `nums` where the elements are sorted in **ascending order**, convert *it to a **height-balanced** binary search tree*.

A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

---

## Examples

### Example 1

```text
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:
```

### Example 2

```text
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.
```

---

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is sorted in a **strictly increasing** order.

---

## Problem Understanding

- In an inorder traversal of a Binary Search Tree (BST), values appear in strictly ascending order.
- A sorted array directly represents the inorder traversal sequence of a BST.
- To guarantee that the constructed BST is height-balanced, the root of any subarray range `[l, r]` must be chosen as the middle element `mid = (l + r) // 2`.
- The elements to the left (`nums[l .. mid-1]`) recursively form the left balanced subtree, and the elements to the right (`nums[mid+1 .. r]`) recursively form the right balanced subtree.

---

## Approach

### Optimized Approach (Recursive Divide and Conquer via Midpoint Selection)

1. Define recursive helper `dfs(l, r)`:
   - Base case: If `l > r`, the range is empty; return `None`.
   - Calculate midpoint: `mid = (l + r) >> 1`.
   - Create root node with value `nums[mid]`.
   - Recursively assign left child: `dfs(l, mid - 1)`.
   - Recursively assign right child: `dfs(mid + 1, r)`.
   - Return the root node.
2. Invoke `dfs(0, len(nums) - 1)` and return the constructed tree.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Every element in `nums` is visited and converted into a `TreeNode` exactly once.
- **Space Complexity:** $O(\log N)$ — The height-balanced property guarantees recursion call stack depth of $O(\log N)$ (excluding memory required for the output tree).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Python 3** | [108convert-sorted-array-to-binary-search-tree.py](./108convert-sorted-array-to-binary-search-tree.py) |

---

## Key Learnings

- Partitioning at the integer midpoint `(l + r) >> 1` guarantees that the size difference between left and right subtrees is at most 1, directly ensuring height balance.
- Operating with index bounds `(l, r)` avoids $O(N)$ array slicing overhead per recursive call.
