---
comments: true
difficulty: Easy
tags:
  - Linked List
  - Two Pointers
  - Stack
  - Recursion
---

# 234. Palindrome Linked List

**[View Problem on LeetCode](https://leetcode.com/problems/palindrome-linked-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0234` (`234`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Linked List`, `Two Pointers`, `Stack`, `Recursion` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `head` of a singly linked list, determine whether the sequence of node values reads the same forward and backward. Return `true` if it is a palindrome, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: head = [1,2,2,1]
Output: true
```

### Example 2

```text
Input: head = [1,2]
Output: false
```

---

## Constraints

- The number of nodes in the list is in the range `[1, 10^5]`.

- `0 <= Node.val <= 9`

---

## Follow-up Questions

Could you do it in `O(n)` time and `O(1)` space?

Our implemented JavaScript solution directly fulfills the follow-up requirement of **`O(n)` time and `O(1)` extra space** by finding the list midpoint via Floyd-style tortoise-and-hare pointers and reversing the second half in-place rather than copying values to an array or call stack.

---

## Problem Understanding

Unlike an array, a singly linked list does not support `O(1)` backward indexing from the tail. If we want to compare symmetric nodes from both ends without allocating an `O(n)` auxiliary array or recursion stack, we must locate the midpoint of the list and reverse the links of the second half in-place. Also check parity: for even length (`[1, 2, 2, 1]`), both halves have equal length `2`; for odd length (`[1, 2, 3, 2, 1]`), the middle element (`3`) mirrors itself and does not need to be compared.

---

## Approach

### Brute Force Approach

Traverse the linked list and push every `node.val` into a JavaScript array `arr`, then use two pointers `l = 0` and `r = arr.length - 1` moving inward to check `arr[l] === arr[r]`. While `O(n)` in time, copying up to `10^5` values requires `O(n)` extra memory.

### Optimized Approach

Execute a three-phase in-place algorithm in `O(n)` time and `O(1)` extra space: (1) find the end of the first half using `slow` and `fast` pointers, (2) sever and reverse the second half in-place, and (3) walk both halves in tandem to verify value equality.

### Step-by-Step Thinking Process

1. Initialize `let slow = head` and `let fast = head.next`, advancing `slow = slow.next` and `fast = fast.next.next` while `fast && fast.next` so `slow` lands squarely on the last node of the first half (or exact middle node for odd length).
2. Split the list at `slow`: set `let cur = slow.next` as the start of the second half and `slow.next = null` to terminate the first half.
3. Reverse the second half iteratively using `pre = null` and `cur`: save `let t = cur.next`, point `cur.next = pre`, advance `pre = cur` and `cur = t`.
4. Compare the reversed second half (`pre`) against the first half (`head`) while `pre` is non-null: return `false` on any `pre.val !== head.val`, else return `true` once `pre` finishes.

### Algorithm / Intuition

Look closely at why starting `fast = head.next` makes both even and odd lengths work seamlessly:
- **Even length (`4` nodes: `1 -> 2 -> 2 -> 1`):** `slow` starts at index `0`, `fast` at index `1`. After one step, `slow` is at index `1` and `fast` is at index `3` (`fast.next === null`), stopping the loop. `slow.next` starts the 2-node second half `[2, 1]`!
- **Odd length (`5` nodes: `1 -> 2 -> 3 -> 2 -> 1`):** `slow` lands at index `2` (the middle node `3`), so `slow.next` starts the 2-node second half `[2, 1]`. In Step 3, `while (pre)` runs for `2` iterations comparing those `2` nodes against the first `2` nodes of `head`, stopping right before the shared middle node `3`!

---

## Dry Run

Tracing Example 1: `head = [1, 2, 2, 1]`:

1. **Step 1 (Find Middle):**
   - Init: `slow = node0(1)`, `fast = node1(2)`.
   - `fast && fast.next` is truthy (`node1` and `node2` exist): `slow` moves to `node1(2)`, `fast` moves to `node3(1)`.
   - Now `fast.next` is `null` -> loop terminates with `slow = node1(2)`.
2. **Step 2 (Reverse Second Half):**
   - `cur = node2(2)`, `slow.next = null` (first half is now `1 -> 2 -> null`), `pre = null`.
   - Iter 1: reverses `node2(2)` -> `pre = 2 -> null`, `cur = node3(1)`.
   - Iter 2: reverses `node3(1)` -> `pre = 1 -> 2 -> null`, `cur = null`.
3. **Step 3 (Compare Halves):**
   - Iter 1: `pre.val (1) === head.val (1)` -> advance `pre` to `2`, `head` to `2`.
   - Iter 2: `pre.val (2) === head.val (2)` -> advance `pre` to `null`, `head` to `null`.
   - `pre` is `null` -> exits loop and returns **`true`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Finding the midpoint (`~n/2` steps), reversing the second half (`~n/2` steps), and comparing the two halves (`~n/2` steps) all run in linear time.
- **Space Complexity:** `O(1)` — Only a constant number of pointer variables (`slow`, `fast`, `cur`, `pre`, `t`) are used, modifying links in-place.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [234palindrome-linked-list.js](./234palindrome-linked-list.js) |

---

## Key Learnings

- Initializing `fast = head.next` (instead of `fast = head`) ensures `slow` stops at the end of the first half rather than the start of the second half on even-length lists.
- Looping `while (pre)` during comparison cleanly handles odd-length lists because `pre` (the second half) has `floor(n / 2)` nodes, automatically ignoring the unpaired middle node at the end of the first half.
- In interview or library settings where mutating caller data is undesirable, you can run the same `O(n)` reversal logic a second time on `pre` before returning to restore the original list structure.
