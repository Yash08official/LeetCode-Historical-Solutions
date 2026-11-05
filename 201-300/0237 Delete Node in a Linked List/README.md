---
comments: true
difficulty: Medium
tags:
  - Linked List
---

# 237. Delete Node in a Linked List

**[View Problem on LeetCode](https://leetcode.com/problems/delete-node-in-a-linked-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0237` (`237`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given direct access **only** to a specific `node` inside a singly linked list — you are **not** given the `head` of the list. All node values are unique, and `node` is guaranteed **not** to be the tail (last node) of the list.

Delete `node` from the linked list in-place so that its value disappears from the list, the list length shrinks by one, and the relative order of all values before and after `node` remains intact.

---

## Examples

### Example 1

```text
Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
```

### Example 2

```text
Input: head = [4,5,1,9], node = 1
Output: [4,5,9]
Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.
```

---

## Constraints

- The number of the nodes in the given list is in the range `[2, 1000]`.

- `-1000 <= Node.val <= 1000`

- The value of each node in the list is **unique**.

- The `node` to be deleted is **in the list** and is **not a tail** node.

---

## Problem Understanding

Normally, deleting a node `X` from a singly linked list requires rewiring `prev.next = X.next`. Here, we have **no `head` pointer** and **no `prev` pointer**, so it is physically impossible to reach the node preceding `node` or change what `prev.next` points to! Instead of detaching the `node` object itself, we must make `node` **impersonate** `node.next` and detach `node.next` — which is always guaranteed to exist because `node` is never the tail.

---

## Approach

### Brute Force Approach

A straightforward multi-step shift walks from `cur = node` all the way to the penultimate node of the list, copying `cur.val = cur.next.val` at every step (shifting every subsequent value one slot left like an array deletion) and setting the second-to-last node's `next = null`. While valid, shifting values to the tail takes `O(n)` time when only a single hop is needed.

### Optimized Approach

Perform a two-line `O(1)` overwrite-and-bypass: copy `node.next.val` into `node.val`, then bypass `node.next` by setting `node.next = node.next.next`.

### Step-by-Step Thinking Process

1. Recognize that since `prev.next` permanently points to the `node` memory object, `node` must remain part of the linked list structure.
2. Verify `node.next` is guaranteed non-null because the problem states `node` is not a tail node.
3. Copy the successor's payload into the current node: `node.val = node.next.val`.
4. Unlink the successor node from the chain: `node.next = node.next.next`.

### Algorithm / Intuition

As the problem statement explicitly clarifies, "deleting" here means removing `node`'s value from the logical sequence and reducing the node count by `1`, not freeing the exact `node` reference.
1. `node.val = node.next.val` overwrites the unwanted value with the next value in sequence (creating a momentary duplicate of `node.next.val`).
2. `node.next = node.next.next` routes around the original `node.next` object so the garbage collector can reclaim it, leaving the list shorter by one node with every value in exact order.

---

## Dry Run

Tracing Example 1: `head = [4, 5, 1, 9]`, given `node` pointing to `5`:

- **Initial state:** `4 -> [5] -> 1 -> 9 -> null` (`node` points to `[5]`, `node.next` points to `1`).
- **Step 1 (`node.val = node.next.val`):** Copies `1` into `node.val`. List becomes `4 -> [1] -> 1 -> 9 -> null`.
- **Step 2 (`node.next = node.next.next`):** Updates `node.next` to point to `9` (skipping the second `1`).
- **Final state:** `4 -> [1] -> 9 -> null` (`[4, 1, 9]`).

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Executes exactly one value assignment and one pointer assignment regardless of list length.
- **Space Complexity:** `O(1)` — Modifies the linked list strictly in-place with zero extra variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [237delete-node-in-a-linked-list.js](./237delete-node-in-a-linked-list.js) |

---

## Key Learnings

- When predecessor links are inaccessible, mutating node data (`node.val = node.next.val`) and deleting the successor achieves `O(1)` logical deletion.
- This technique strictly fails on a **tail node** (`node.next === null`), which is why the problem explicitly constrains `node` not to be the tail.
- In real-world systems, be cautious with value-copy deletion if external references point to `node.next` or if node objects are large/immutable.
