---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Two Pointers
---

# 19. Remove Nth Node From End of List

**[View Problem on LeetCode](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0019` (`19`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Two Pointers` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `head` of a singly linked list and an integer `n`, remove the **`n`-th node from the end** of the list (`1`-indexed from the tail) and return the head of the modified list.

---

## Examples

### Example 1

```text
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

### Example 2

```text
Input: head = [1], n = 1
Output: []
```

### Example 3

```text
Input: head = [1,2], n = 1
Output: [1]
```

---

## Constraints

- The number of nodes in the list is `sz`.

- `1 <= sz <= 30`

- `0 <= Node.val <= 100`

- `1 <= n <= sz`

---

## Follow-up Questions

Could you do this in one pass?

The implemented lead-lag two-pointer (`fast` and `slow`) approach directly fulfills the follow-up requirement by completing the deletion in a single pass over the linked list.

---

## Problem Understanding

- **Singly linked limitation:** Nodes have no backward `prev` pointer and the total list length `sz` (`1 <= n <= sz <= 30`) is unknown upfront.
- **Deleting the head node:** When `n == sz` (e.g., `head = [1]`, `n = 1` or `head = [1, 2]`, `n = 2`), the node to remove is `head` itself! Prepending a `dummy` node before `head` guarantees there is always a predecessor node `slow` whose `.next` pointer can be bypassed.
- **Fixed gap invariant:** Keeping `fast` exactly `n` nodes ahead of `slow` means that when `fast` stops at the **last** node (`fast.next === null`), `slow` sits at the `(n + 1)`-th node from the end — directly before the target node.

---

## Approach

### Brute Force Approach

Perform a **two-pass** traversal: pass `1` walks the entire list to count its length `sz`; pass `2` walks `sz - n` steps from a `dummy` node to unlink the target node. While still `O(sz)` time and `O(1)` space, traversing the list twice visits up to `2 * sz` nodes instead of solving it in a single pass.

### Optimized Approach

Attach a `dummy` sentinel before `head`, advance `fast` by `n` steps to establish an `n`-node gap ahead of `slow`, then advance `fast` and `slow` in lockstep until `fast.next` is `null` and bypass `slow.next`.

### Step-by-Step Thinking Process

1. Create `const dummy = new ListNode(0, head)` and initialize `fast = dummy`, `slow = dummy`.
2. Advance `fast` forward `n` times (`while (n--) fast = fast.next`) so `fast` leads `slow` by `n` links.
3. Move both `slow` and `fast` one step at a time while `fast.next` is truthy.
4. When `fast.next` becomes `null`, `slow.next` points to the `n`-th node from the end; unlink it via `slow.next = slow.next.next`.
5. Return `dummy.next`.

### Algorithm / Intuition

In `19remove-nth-node-from-end-of-list.js`, starting both `fast` and `slow` at `dummy` makes boundary arithmetic effortless. Suppose `head` has `sz` nodes (`1..sz`, with `dummy` at position `0`). Advancing `fast` by `n` places `fast` at position `n`. Then `while (fast.next)` advances both pointers `sz - n` steps until `fast` reaches position `sz` (the tail). At that exact instant, `slow` is at position `0 + (sz - n) = sz - n`, right before target node `sz - n + 1`! Even when `n === sz` (removing `head`), `fast` reaches the tail immediately, `while (fast.next)` executes `0` times, `slow` stays at `dummy`, and `dummy.next = dummy.next.next` cleanly updates the head.

---

## Dry Run

**Input:** `head = [1, 2, 3, 4, 5]`, `n = 2`

List with sentinel: `dummy(0) -> 1 -> 2 -> 3 -> 4 -> 5 -> null`

1. **Init:** `fast = dummy(0)`, `slow = dummy(0)`.
2. **Advance `fast` `n = 2` steps:**
   - `n = 2 -> 1`: `fast = Node(1)`
   - `n = 1 -> 0`: `fast = Node(2)`
3. **Lockstep `while (fast.next)`:**
   - `fast = Node(2)` (`fast.next` is `3`): `slow = Node(1)`, `fast = Node(3)`
   - `fast = Node(3)` (`fast.next` is `4`): `slow = Node(2)`, `fast = Node(4)`
   - `fast = Node(4)` (`fast.next` is `5`): `slow = Node(3)`, `fast = Node(5)`
   - `fast = Node(5)` (`fast.next` is `null`): exit loop.
4. **Unlink:** `slow` is `Node(3)`. `slow.next = slow.next.next` links `Node(3) -> Node(5)`, skipping `Node(4)`.
5. **Return:** `dummy.next` -> `[1, 2, 3, 5]`.

---

## Complexity Analysis

- **Time Complexity:** `O(L)` — Where `L` is the number of nodes in the list. `fast` traverses `L` links in a single pass from `dummy` to the tail.
- **Space Complexity:** `O(1)` — Allocates only one sentinel `ListNode` (`dummy`) and two pointer variables (`fast`, `slow`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [19remove-nth-node-from-end-of-list.js](./19remove-nth-node-from-end-of-list.js) |

---

## Key Learnings

- A two-pointer lead gap of `n` nodes converts "distance from unknown tail" into a single-pass traversal.
- Always use a `dummy` head node in linked-list deletion problems so deleting `head` requires zero special-case `if` branches.
- Stopping on `while (fast.next)` (rather than `while (fast)`) parks `slow` at the **predecessor** of the target node using an exact `n`-step lead.
