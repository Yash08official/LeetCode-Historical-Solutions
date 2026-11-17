---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Linked List
---

# 138. Copy List with Random Pointer

**[View Problem on LeetCode](https://leetcode.com/problems/copy-list-with-random-pointer/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0138` (`138`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Linked List` |
| **Solution Language** | JavaScript |

---

## Problem Description

A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.

Construct a **deep copy** of the list. The deep copy should consist of exactly `n` **brand new** nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. **None of the pointers in the new list should point to nodes in the original list**.

For example, if there are two nodes `X` and `Y` in the original list, where `X.random --> Y`, then for the corresponding two nodes `x` and `y` in the copied list, `x.random --> y`.

Return *the head of the copied linked list*.

The linked list is represented in the input/output as a list of `n` nodes. Each node is represented as a pair of `[val, random_index]` where:

	
- `val`: an integer representing `Node.val`
	
- `random_index`: the index of the node (range from `0` to `n-1`) that the `random` pointer points to, or `null` if it does not point to any node.

Your code will **only** be given the `head` of the original linked list.

---

## Examples

### Example 1

```text
**Input:** head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
**Output:** [[7,null],[13,0],[11,4],[10,2],[1,0]]
```

### Example 2

```text
**Input:** head = [[1,1],[2,1]]
**Output:** [[1,1],[2,1]]
```

### Example 3

****

```text
**Input:** head = [[3,null],[3,0],[3,null]]
**Output:** [[3,null],[3,0],[3,null]]
```

 

**

---

## Constraints

**

	
- `0 <= n <= 1000`
	
- `-10^4 <= Node.val <= 10^4`
	
- `Node.random` is `null` or is pointing to some node in the linked list.

---

## Problem Understanding

- We need to create a deep copy of a linked list where each node has a `next` pointer and a `random` pointer pointing to any node or `null`.
- The copy must be constructed without modifying original node associations after completion.

---

## Approach

### Optimized Approach (In-Place Interweaving / Three-Pass Linear Scan)

1. **Pass 1 (Interweave):** For each original node, create a copy and insert it directly after the original (`node -> copy -> node.next`).
2. **Pass 2 (Assign Random):** For each original node, set `cur.next.random = cur.random ? cur.random.next : null`.
3. **Pass 3 (Separate Lists):** Decouple the interwoven list into the original list and the cloned list by restoring original `next` pointers and linking copy `next` pointers.
4. Return the head of the cloned list.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Three linear passes over the linked list.
- **Space Complexity:** $O(1)$ auxiliary space — Nodes are cloned in-place without auxiliary HashMaps.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [138copy-list-with-random-pointer.js](./138copy-list-with-random-pointer.js) |

---

## Key Learnings

- Interweaving cloned nodes immediately after original nodes embeds pointer mappings directly in the list structure, eliminating HashMap space overhead.
