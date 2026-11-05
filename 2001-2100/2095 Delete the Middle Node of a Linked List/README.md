---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Two Pointers
---

# 2095. Delete the Middle Node of a Linked List

**[View Problem on LeetCode](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2095` (`2095`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a singly linked list of length `n`, remove its **middle node** and return the `head` of the updated list.

Using **0-based indexing**, the middle node is defined as the node at index `floor(n / 2)` from the start of the list. For example, lists of lengths `1, 2, 3, 4, 5` have their middle nodes at indices `0, 1, 1, 2, 2`, respectively. In particular, if the list contains only `1` node, deleting index `0` leaves an empty list (`null`).

---

## Examples

### Example 1

```text
Input: head = [1,3,4,7,1,2,6]
Output: [1,3,4,1,2,6]
Explanation:
The above figure represents the given linked list. The indices of the nodes are written below.
Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
We return the new list after removing this node.
```

### Example 2

```text
Input: head = [1,2,3,4]
Output: [1,2,4]
Explanation:
The above figure represents the given linked list.
For n = 4, node 2 with value 3 is the middle node, which is marked in red.
```

### Example 3

```text
Input: head = [2,1]
Output: [2]
Explanation:
The above figure represents the given linked list.
For n = 2, node 1 with value 1 is the middle node, which is marked in red.
Node 0 with value 2 is the only node remaining after removing node 1.
```

---

## Constraints

- The number of nodes in the list is in the range `[1, 10^5]`.

- `1 <= Node.val <= 10^5`

---

## Problem Understanding

- **Target Predecessor:** Deleting a node in a singly linked list requires a reference to the node **immediately before** the target node so we can rewire `prev.next = prev.next.next`.
- **Offset Fast/Slow Pointers:** In standard tortoise-and-hare traversal where both `slow` and `fast` start at `head`, `slow` stops *at* index `floor(n / 2)`. By starting `slow` one step earlier on a `dummy` node (`dummy.next = head`) while keeping `fast = head`, `slow` stops at index `floor(n / 2) - 1` (or `dummy` when `n = 1`), which is the exact predecessor needed!
- **Single-Node Edge Case:** When `n = 1`, `fast.next` is `null` immediately, `slow` stays at `dummy`, `dummy.next` becomes `head.next` (`null`), and returning `dummy.next` cleanly returns `null` without extra branches.

---

## Approach

### Brute Force Approach

A two-pass approach first traverses the entire linked list to count the total number of nodes `n`, computes `mid = n / 2`, and then traverses a second time from `head` up to index `mid - 1` to unlink the middle node (handling `n == 1` separately). While still `O(n)` time and `O(1)` space, it traverses the list twice and requires special-case handling for `n = 1`.

### Optimized Approach

Use a sentinel `dummy` node pointing to `head` alongside two pointers (`slow = dummy` and `fast = head`) to locate the predecessor of the middle node in a single pass, then bypass `slow.next`.

### Step-by-Step Thinking Process

1. Recognize that unlinking node `floor(n / 2)` requires stopping at node `floor(n / 2) - 1`, and that `n = 1` removes `head` itself.
2. Create a sentinel node `dummy = new ListNode(0, head)` so every node—including `head`—has a valid predecessor.
3. Initialize `slow = dummy` and `fast = head`, advancing `slow` by 1 step and `fast` by 2 steps while `fast != null && fast.next != null`.
4. After `floor(n / 2)` iterations, `fast` reaches the end of the list and `slow` sits right before the middle node; execute `slow.next = slow.next.next` and return `dummy.next`.

### Algorithm / Intuition

Let the list have `n` nodes indexed `0` through `n - 1`. Each iteration of `while (fast != null && fast.next != null)` advances `fast` by `2` positions starting from index `0`. The loop runs exactly `floor(n / 2)` times:
- If `n = 2k` (even), `fast` visits indices `0, 2, ..., 2k - 2` and exits after `k` steps when `fast` becomes `null`.
- If `n = 2k + 1` (odd), `fast` visits indices `0, 2, ..., 2k` and exits after `k` steps because `fast.next == null`.

Because `slow` starts at `dummy` (conceptual index `-1`) and advances `1` step per iteration, after `floor(n / 2)` iterations `slow` sits at index `-1 + floor(n / 2)`. Thus `slow.next` is guaranteed to be node `floor(n / 2)`. Setting `slow.next = slow.next.next` removes the middle node in `O(1)` pointer updates, and `dummy.next` returns the new list head.

---

## Dry Run

Trace on **Example 1**: `head = [1, 3, 4, 7, 1, 2, 6]` (`n = 7`, target middle index `floor(7 / 2) = 3`, value `7`).

| Step | `slow` (node value / idx) | `fast` (node value / idx) | Loop Condition (`fast != null && fast.next != null`) |
| :--- | :--- | :--- | :--- |
| Init | `dummy (0)` @ `-1` | `1` @ `0` | `true` (`fast = 1`, `fast.next = 3`) |
| Iter 1 | `1` @ `0` | `4` @ `2` | `true` (`fast = 4`, `fast.next = 7`) |
| Iter 2 | `3` @ `1` | `1` @ `4` | `true` (`fast = 1`, `fast.next = 2`) |
| Iter 3 | `4` @ `2` | `6` @ `6` | `false` (`fast = 6`, `fast.next = null`) |

- Loop terminates with `slow` at node `4` (index `2`), whose `next` is node `7` (index `3`).
- `slow.next = slow.next.next` links node `4` directly to node `1` (index `4`).
- Returns `dummy.next`: `[1, 3, 4, 1, 2, 6]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The `while` loop executes `floor(n / 2)` iterations, visiting at most `n` nodes in a single pass.
- **Space Complexity:** `O(1)` — Only one sentinel `ListNode` (`dummy`) and two pointer references (`slow`, `fast`) are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2095delete-the-middle-node-of-a-linked-list.java](./2095delete-the-middle-node-of-a-linked-list.java) |

---

## Key Learnings

- Placing `slow` on a `dummy` node while starting `fast` at `head` shifts `slow` backward by one node, landing directly on the predecessor of the middle node.
- Sentinel (`dummy`) nodes eliminate edge-case branching when the `head` of a linked list might be deleted (such as `n = 1`).
