---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Two Pointers
---

# 86. Partition List

**[View Problem on LeetCode](https://leetcode.com/problems/partition-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0086` (`86`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a linked list and a value `x`, partition it such that all nodes **less than** `x` come before nodes **greater than or equal** to `x`.

You should **preserve the original relative order** of the nodes in each of the two partitions.

---

## Examples

### Example 1

```text
Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
```

### Example 2

```text
Input: head = [2,1], x = 2
Output: [1,2]
```

---

## Constraints

- The number of nodes in the list is in the range `[0, 200]`.
- `-100 <= Node.val <= 100`
- `-200 <= x <= 200`

---

## Problem Understanding

- We need to split the list into two sublists:
  1. Nodes with values strictly less than `x`.
  2. Nodes with values greater than or equal to `x`.
- The relative order within each sublist must remain stable (identical to original appearance).
- Finally, the end of the first sublist must connect to the head of the second sublist, and the second sublist must terminate with `null`.

---

## Approach

### Optimized Approach (Two-Queue / Two Sentinel Chains)

1. Create two sentinel nodes: `l` (for values $< x$) and `r` (for values $\ge x$).
2. Keep tail pointers `tl = l` and `tr = r`.
3. Iterate through the input list node by node (`head`):
   - If `head.val < x`: attach `tl.next = head`, advance `tl = tl.next`.
   - Else: attach `tr.next = head`, advance `tr = tr.next`.
4. Crucial step: terminate the second list by setting `tr.next = null` to avoid cycles.
5. Connect the tail of the less-than list to the head of the greater-or-equal list: `tl.next = r.next`.
6. Return `l.next`.

---

## Dry Run

Consider `head = [1, 4, 3, 2, 5, 2]`, `x = 3`:
- Node 1: $< 3$ -> `l` chain: `1`
- Node 4: $\ge 3$ -> `r` chain: `4`
- Node 3: $\ge 3$ -> `r` chain: `4 -> 3`
- Node 2: $< 3$ -> `l` chain: `1 -> 2`
- Node 5: $\ge 3$ -> `r` chain: `4 -> 3 -> 5`
- Node 2: $< 3$ -> `l` chain: `1 -> 2 -> 2`
- Terminate `r` chain: `5.next = null`.
- Connect: `2.next = 4`.
- Result: `1 -> 2 -> 2 -> 4 -> 3 -> 5`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single forward pass across the list of $N$ nodes.
- **Space Complexity:** $O(1)$ — Rearranges existing nodes in-place using two sentinel references.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [86partition-list.java](./86partition-list.java) |

---

## Key Learnings

- Splitting linked lists into separate logical partitions using dual dummy heads is much simpler and safer than swapping nodes in-place.
- Always remember to set the trailing pointer's `next` to `null` to avoid accidental infinite cycles in the reconstructed list.
