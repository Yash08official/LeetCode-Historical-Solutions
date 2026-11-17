---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Two Pointers
  - Stack
  - Recursion
---

# 143. Reorder List

**[View Problem on LeetCode](https://leetcode.com/problems/reorder-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0143` (`143`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Two Pointers`, `Stack`, `Recursion` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given the head of a singly linked-list. The list can be represented as:

```text
L0 → L1 → … → Ln - 1 → Ln
```

*Reorder the list to be on the following form:*

```text
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
```

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

---

## Examples

### Example 1

```text
**Input:** head = [1,2,3,4]
**Output:** [1,4,2,3]
```

### Example 2

```text
**Input:** head = [1,2,3,4,5]
**Output:** [1,5,2,4,3]
```

 

**

---

## Constraints

**

	
- The number of nodes in the list is in the range `[1, 5 * 10^4]`.
	
- `1 <= Node.val <= 1000`

---

## Problem Understanding

- Reorder list $L_0 	o L_1 	o \dots 	o L_{n-1} 	o L_n$ into $L_0 	o L_n 	o L_1 	o L_{n-1} 	o L_2 	o L_{n-2} 	o \dots$ in-place without modifying node values.

---

## Approach

### Optimized Approach (Find Middle + Reverse Second Half + Interleave Merge)

1. **Find Middle:** Use fast and slow pointers (`slow` moves 1 step, `fast` moves 2 steps) to locate the midpoint of the linked list.
2. **Split & Reverse:** Disconnect the first half from the second half (`slow.next = null`), and reverse the second half in-place using standard three-pointer reversal (`pre`, `cur`, `nxt`).
3. **Interleave Merge:** Merge the two halves alternatingly:
   - Connect `head` to reversed head `pre`.
   - Advance pointers and continue interleaving until the second half is exhausted.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Finding midpoint takes $O(n/2)$, reversing takes $O(n/2)$, and merging takes $O(n)$.
- **Space Complexity:** $O(1)$ — All operations are executed in-place by updating pointer references.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [143reorder-list.js](./143reorder-list.js) |

---

## Key Learnings

- Decomposing complex list rearrangements into fundamental primitives (find mid, reverse, merge) keeps the implementation clean and modular.
