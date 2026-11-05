---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - Linked List
  - Two Pointers
  - Floyd's Cycle Finding Algorithm
---

# 141. Linked List Cycle

**[View Problem on LeetCode](https://leetcode.com/problems/linked-list-cycle/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0141` (`141`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `Linked List`, `Two Pointers`, `Floyd's Cycle Finding Algorithm` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `head` of a singly linked list, determine whether the list contains a cycle. A cycle exists if following `next` pointers from `head` eventually visits the same node more than once (instead of terminating at `null`).

Note that `pos` shown in the examples is only used internally by the test harness to build the input list and is **not** accessible to your function. Return `true` if a cycle is present, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
```

### Example 2

```text
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
```

### Example 3

```text
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

---

## Constraints

- The number of the nodes in the list is in the range `[0, 10^4]`.

- `-10^5 <= Node.val <= 10^5`

- `pos` is `-1` or a **valid index** in the linked-list.

---

## Follow-up Questions

Can you solve it using `O(1)` (i.e. constant) memory?

The implemented solution directly solves the follow-up question in **`O(1)` constant memory** using Floyd's Tortoise and Hare two-pointer technique instead of an `O(n)` `Set`.

---

## Problem Understanding

- **Reference Identity, Not Value Equality:** Two distinct nodes may hold identical `Node.val` integers (`-10^5 <= Node.val <= 10^5`), so cycle detection must compare node object references (`slow === fast`), never `.val`.
- **Empty and Single-Node Lists:** The list can have `0` nodes (`head === null`) or `1` node (`head.next === null` or pointing to itself), so pointer dereferencing must guard `fast && fast.next`.
- **Finite vs. Infinite Traversal:** An acyclic list reaches `null` in at most `n` steps; a cyclic list traps any forward pointer inside the loop forever unless we detect a collision.

---

## Approach

### Brute Force Approach

Store every visited `ListNode` reference inside a `Set`. While traversing `curr = curr.next`, if `seen.has(curr)` is true, return `true`; if `curr` becomes `null`, return `false`. Although this runs in `O(n)` time, it requires `O(n)` extra memory to store all node references.

### Optimized Approach

Use **Floyd's Tortoise and Hare Algorithm** (fast and slow two pointers). Advance `slow` by `1` node and `fast` by `2` nodes per iteration; if a cycle exists, `fast` is guaranteed to lap and collide with `slow` (`slow === fast`), using `O(1)` memory.

### Step-by-Step Thinking Process

1. Initialize both `slow` and `fast` pointers at `head`.
2. Loop while `fast` and `fast.next` are both non-null so `fast.next.next` can be safely accessed.
3. Move `slow = slow.next` (1 step) and `fast = fast.next.next` (2 steps).
4. Once both pointers enter a cycle, the distance from `fast` behind `slow` decreases by `2 - 1 = 1` node every iteration, meaning `fast` cannot skip over `slow` without landing on the exact same node.
5. If `slow === fast`, return `true`; if the loop exits because `fast` hit the end of the list, return `false`.

### Algorithm / Intuition

Think of two runners on a track with a straight entry stem of length `L` leading into a circular loop of length `C`. If there is no loop, the faster runner (`fast`) reaches the finish line (`null` or last node) in `n / 2` steps and terminates the `while (fast && fast.next)` loop. If there is a loop, by the time `slow` enters the loop after `L` steps, `fast` is already somewhere inside the loop. From that moment onward, `fast` closes the gap to `slow` by exactly `1` node per step, guaranteeing `slow === fast` within at most `C` additional iterations—before `slow` even completes its first full lap.

---

## Dry Run

Trace on **Example 1**: `head = [3, 2, 0, -4]`, `pos = 1` (`node(-4).next -> node(2)`)

| Iteration | `slow` (before -> after) | `fast` (before -> after) | `slow === fast`? |
| :--- | :--- | :--- | :--- |
| Start | `node(3)` | `node(3)` | — |
| 1 | `node(3) -> node(2)` | `node(3) -> node(0)` | `false` |
| 2 | `node(2) -> node(0)` | `node(0) -> node(2)` | `false` |
| 3 | `node(0) -> node(-4)` | `node(2) -> node(-4)` | `true` (Return `true`) |

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — In an acyclic list, `fast` reaches the end in `O(n)` steps. In a cyclic list, `slow` takes `L` steps to enter the cycle and at most `C` steps inside the cycle before `fast` catches up (`L + C <= n`).
- **Space Complexity:** `O(1)` — Only two pointer variables (`slow` and `fast`) are used regardless of list size.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [141linked-list-cycle.js](./141linked-list-cycle.js) |

---

## Key Learnings

- Moving `fast` at speed `2` and `slow` at speed `1` guarantees a relative speed of `1`, preventing `fast` from ever jumping past `slow` inside a cycle without colliding.
- Always check `while (fast && fast.next)` before evaluating `fast.next.next` to handle `head = null` and odd/even length lists cleanly.
- Always compare node references (`slow === fast`) rather than node values (`slow.val === fast.val`), since duplicate values can exist in acyclic lists.
