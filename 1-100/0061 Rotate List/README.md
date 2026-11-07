---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Two Pointers
---

# 61. Rotate List

**[View Problem on LeetCode](https://leetcode.com/problems/rotate-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0061` (`61`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a linked list, rotate the list to the right by `k` places.

---

## Examples

### Example 1

```text
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
```

### Example 2

```text
Input: head = [0,1,2], k = 4
Output: [2,0,1]
```

---

## Constraints

- The number of nodes in the list is in the range `[0, 500]`.
- `-100 <= Node.val <= 100`
- `0 <= k <= 2 * 10^9`

---

## Problem Understanding

- Rotating right by $k$ places means the last $k \pmod n$ nodes detach from the end and attach to the beginning.
- If $head$ is empty, has 1 node, or $k \pmod n == 0$, no rotation is needed.

---

## Approach

### Optimized Approach (Fast-Slow Pointer Split and Re-linking)

1. If `head == null || head.next == null`, return `head`.
2. Compute list length $n$ by traversing to the end.
3. Compute effective rotation: `k %= n`. If `k == 0`, return `head`.
4. Advance `fast` pointer $k$ steps ahead of `slow`.
5. Move both `fast` and `slow` until `fast.next == null`.
   - `slow` now points to the node preceding the new head.
   - `fast` points to the original tail node.
6. Set new head: `ans = slow.next`.
7. Sever list: `slow.next = null`.
8. Link original tail to original head: `fast.next = head`.
9. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — One pass to count length $N$, followed by one pass of two pointers.
- **Space Complexity:** $O(1)$ — Only pointer manipulation with constant extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [61rotate-list.java](./61rotate-list.java) |

---

## Key Learnings

- `k % n` avoids redundant complete cycles around the list when $k \ge n$.
- Maintaining a gap of $k$ between fast and slow pointers locates the new cut point in a single traversal.
