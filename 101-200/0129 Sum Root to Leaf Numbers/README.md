---
comments: true
difficulty: Medium
tags:
  - Tree
  - Depth-First Search
  - Binary Tree
---

# 129. Sum Root to Leaf Numbers

**[View Problem on LeetCode](https://leetcode.com/problems/sum-root-to-leaf-numbers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0129` (`129`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Depth-First Search`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given the `root` of a binary tree containing digits from `0` to `9` only.

Each root-to-leaf path in the tree represents a number.

	
- For example, the root-to-leaf path `1 -> 2 -> 3` represents the number `123`.

Return *the total sum of all root-to-leaf numbers*. Test cases are generated so that the answer will fit in a **32-bit** integer.

A **leaf** node is a node with no children.

---

## Examples

### Example 1

```text
**Input:** root = [1,2,3]
**Output:** 25
**Explanation:**
The root-to-leaf path `1->2` represents the number `12`.
The root-to-leaf path `1->3` represents the number `13`.
Therefore, sum = 12 + 13 = `25`.
```

### Example 2

```text
**Input:** root = [4,9,0,5,1]
**Output:** 1026
**Explanation:**
The root-to-leaf path `4->9->5` represents the number 495.
The root-to-leaf path `4->9->1` represents the number 491.
The root-to-leaf path `4->0` represents the number 40.
Therefore, sum = 495 + 491 + 40 = `1026`.
```

 

**

---

## Constraints

**

	
- The number of nodes in the tree is in the range `[1, 1000]`.
	
- `0 <= Node.val <= 9`
	
- The depth of the tree will not exceed `10`.

---

## Problem Understanding

- Each root-to-leaf path represents a number formed by concatenating node values along the path.
- Return the total sum of all root-to-leaf numbers.

---

## Approach

### Optimized Approach (Recursive Depth-First Search)

1. Define helper `dfs(root, s)` where `s` is the accumulated number from root down to current node.
2. Base case: If `!root`, return `0`.
3. Accumulate current digit: `s = s * 10 + root.val`.
4. If leaf node (`!root.left && !root.right`), return `s` directly.
5. Otherwise, return `dfs(root.left, s) + dfs(root.right, s)`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Every node is visited once.
- **Space Complexity:** $O(h)$ — Call stack proportional to tree height $h$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [129sum-root-to-leaf-numbers.js](./129sum-root-to-leaf-numbers.js) |

---

## Key Learnings

- Accumulating path value top-down via `s * 10 + val` avoids string conversions and calculates sums on the fly.
