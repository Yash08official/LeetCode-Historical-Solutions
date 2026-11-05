---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Math
  - Recursion
---

# 2. Add Two Numbers

**[View Problem on LeetCode](https://leetcode.com/problems/add-two-numbers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0002` (`2`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Math`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

You are given two non-empty singly linked lists `l1` and `l2` representing two non-negative integers. Their digits are stored in **reverse order** (the head node holds the ones digit, the next holds the tens digit, and so on), with each node containing a single digit from `0` to `9`.

Compute the sum of the two integers and return it as a newly constructed linked list in the same reverse-digit format. Neither input list has leading zeros except when representing the number `0` itself.

---

## Examples

### Example 1

```text
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

### Example 2

```text
Input: l1 = [0], l2 = [0]
Output: [0]
```

### Example 3

```text
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

---

## Constraints

- The number of nodes in each linked list is in the range `[1, 100]`.

- `0 <= Node.val <= 9`

- It is guaranteed that the list represents a number that does not have leading zeros.

---

## Problem Understanding

- **Reverse-order advantage:** Because the least significant digits appear at the heads of `l1` and `l2`, elementary column-by-column addition naturally proceeds from head to tail.
- **Unequal lengths:** One list can have up to `100` nodes while the other has only `1`; exhausted lists should contribute `0` for remaining digit positions.
- **Final carry:** Even after both `l1` and `l2` reach `null`, a non-zero `carry` (such as `5 + 5 = 10` or `9999 + 1 = 10000`) requires appending one extra node of value `1`.
- **Integer overflow trap:** A `100`-digit number vastly exceeds Java's `long` (`~19` digits) and even requires `BigInteger` if converted, so digit-by-digit list traversal is essential.

---

## Approach

### Brute Force Approach

Convert `l1` and `l2` into full integer values (using arbitrary-precision `BigInteger` since `100` digits overflow 64-bit `long`), add them together, and repeatedly extract digits modulo `10` to build the output linked list. Although functionally workable with `BigInteger`, it allocates large string/big-number buffers and performs unnecessary base conversions instead of adding nodes directly.

### Optimized Approach

Simulate grade-school digit-by-digit addition in a single pass over both linked lists using a `dummy` head node and a running `carry` variable.

### Step-by-Step Thinking Process

1. Create a sentinel `dummy` node (`new ListNode(0)`) and a tail pointer `current = dummy` so every output digit node is appended uniformly without special-casing the head.
2. Keep looping as long as `l1 != null`, `l2 != null`, or `carry != 0` so unequal list lengths and leftover carries are handled in the same loop.
3. At each step, add `(l1 != null ? l1.val : 0)`, `(l2 != null ? l2.val : 0)`, and `carry` into `sum`.
4. Extract the new digit `sum % 10` into `current.next`, update `carry = sum / 10`, and advance `current`, `l1`, and `l2`.
5. Return `dummy.next` as the head of the resulting sum list.

### Algorithm / Intuition

In `2add-two-numbers.java`, `dummy` anchors the result list while `current` tracks the last appended node. Inside the `while (l1 != null || l2 != null || carry != 0)` loop, ternary expressions safely substitute `0` whenever `l1` or `l2` has already terminated. Because each node value is at most `9` and `carry` is at most `1`, `sum` never exceeds `9 + 9 + 1 = 19`. Integer division `sum / 10` yields the next `carry` (`0` or `1`), while `sum % 10` gives the single digit stored in `new ListNode(sum % 10)`. Advancing `l1` and `l2` guarded by null checks ensures clean termination.

---

## Dry Run

**Input:** `l1 = [2, 4, 3]`, `l2 = [5, 6, 4]`

| Step | `l1.val` | `l2.val` | Incoming `carry` | `sum` | New Node (`sum % 10`) | Outgoing `carry` (`sum / 10`) | Result List (`dummy.next`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `2` | `5` | `0` | `7` | `7` | `0` | `[7]` |
| `2` | `4` | `6` | `0` | `10` | `0` | `1` | `[7, 0]` |
| `3` | `3` | `4` | `1` | `8` | `8` | `0` | `[7, 0, 8]` |

After Step `3`, `l1 == null`, `l2 == null`, and `carry == 0`, so the loop exits and returns `dummy.next` -> `[7, 0, 8]`.

---

## Complexity Analysis

- **Time Complexity:** `O(max(m, n))` — Where `m` and `n` are the lengths of `l1` and `l2`. The loop runs at most `max(m, n) + 1` iterations, doing `O(1)` work per node.
- **Space Complexity:** `O(1)` auxiliary space (`O(max(m, n))` including the output list) — Only constant pointer and integer variables (`dummy`, `current`, `carry`, `sum`) are used beyond the required result nodes.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2add-two-numbers.java](./2add-two-numbers.java) |

---

## Key Learnings

- Including `carry != 0` directly in the `while` condition eliminates post-loop boilerplate for a trailing carry node.
- A `dummy` head node simplifies linked-list construction by removing null-head branching on the first iteration.
- Processing linked-list digits in place scales effortlessly to arbitrarily long numbers without risking integer overflow.
