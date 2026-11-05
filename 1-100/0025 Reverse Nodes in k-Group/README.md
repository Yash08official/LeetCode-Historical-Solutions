---
comments: true
difficulty: Hard
tags:
  - Linked List
  - Recursion
---

# 25. Reverse Nodes in k-Group

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-nodes-in-k-group/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0025` (`25`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Linked List`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a singly linked list and an integer `k`, reverse the nodes of the list `k` at a time and return the modified list.

If the number of remaining nodes at the end of the list is not a multiple of `k` (fewer than `k` nodes left), those leftover nodes must stay in their original order. You must rewire the nodes themselves without altering node `.val` values.

---

## Examples

### Example 1

```text
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
```

### Example 2

```text
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
```

---

## Constraints

- The number of nodes in the list is `n`.

- `1 <= k <= n <= 5000`

- `0 <= Node.val <= 1000`

---

## Follow-up Questions

Can you solve the problem in `O(1)` extra memory space?

The implemented Java solution directly satisfies the `O(1)` extra memory follow-up: both `reverseKGroup` and its helper `reverseList` are purely iterative and manipulate existing `ListNode` references in-place without recursion or auxiliary containers.

---

## Problem Understanding

- **Exact `k`-group check:** Before reversing any segment, we must verify that at least `k` nodes exist ahead; otherwise, a partial group at the end would be wrongly reversed.
- **Boundary stitching:** Reversing a segment `[start .. cur]` turns `cur` into the segment's new first node and `start` into its new last node. Thus, the node preceding the segment (`pre`) must link to the reversed head (`cur`), and `start.next` must reconnect to the node originally after `cur` (`t`).
- **Constraints:** `1 <= k <= n <= 5000`, and the follow-up asks for `O(1)` extra memory.

---

## Approach

### Brute Force Approach

A straightforward non-constant-space approach pushes up to `k` nodes onto a stack (or recursively processes each `k`-group on the call stack), popping them to reverse links when the stack reaches size `k`. That uses `O(k)` stack space or `O(n / k)` recursion frames rather than `O(1)` auxiliary memory.

### Optimized Approach

The implemented Java solution achieves **`O(1)` extra space** iteratively using a `dummy` sentinel head and group boundary pointers (`pre`, `cur`, `start`, `t`). For each group, `cur` advances `k` steps; if `k` nodes exist, it temporarily detaches the group (`cur.next = null`), reverses it in-place via helper `reverseList(start)`, stitches both ends back into the main list, and advances `pre` and `cur` to `start`.

### Step-by-Step Thinking Process

1. Create `dummy = new ListNode(0, head)` and initialize `pre = dummy` and `cur = dummy`, where `pre` always marks the tail of the previously processed group.
2. Loop while `cur.next != null`: walk `cur` forward `k` times (`for (int i = 0; i < k && cur != null; ++i) cur = cur.next`).
3. If `cur == null`, fewer than `k` nodes remained—return `dummy.next` immediately so the leftover tail stays untouched.
4. Save `t = cur.next` (start of next group) and `start = pre.next` (head of current group), then sever `cur.next = null` so `reverseList(start)` stops cleanly at the end of these `k` nodes.
5. Reverse and reconnect: `pre.next = reverseList(start)` links the previous tail to the reversed group's new head, and `start.next = t` links the reversed group's new tail (`start`) to the rest of the list. Finally set `pre = start` and `cur = pre`.

### Algorithm / Intuition

Temporarily setting `cur.next = null` is the key design choice that keeps the code modular and bug-free. Because the `k`-node sublist starting at `start` becomes null-terminated just like a standalone list, `reverseList(start)` can use the classic three-pointer (`pre`, `p`, `q`) reversal without counting `k` steps again. Afterward, `start`—which was the first node before reversal—is guaranteed to be the last node of the reversed group, making `start.next = t` and `pre = start` immediate `O(1)` updates.

---

## Dry Run

Tracing Example 1: `head = [1, 2, 3, 4, 5]`, `k = 2`

- **Initial:** `dummy -> 1 -> 2 -> 3 -> 4 -> 5`, `pre = dummy`, `cur = dummy`.
- **Iteration 1:**
  - Advance `cur` `2` steps: `cur` lands on `2`.
  - `t = 3`, `cur.next = null` (isolates `1 -> 2`), `start = 1`.
  - `pre.next = reverseList(1)` -> `dummy -> 2 -> 1`; `start.next = t` -> `1 -> 3`.
  - List is now `dummy -> 2 -> 1 -> 3 -> 4 -> 5`. Reset `pre = 1`, `cur = 1`.
- **Iteration 2:**
  - Advance `cur` `2` steps from `1`: `cur` lands on `4`.
  - `t = 5`, `cur.next = null` (isolates `3 -> 4`), `start = 3`.
  - `pre.next = reverseList(3)` -> `1 -> 4 -> 3`; `start.next = t` -> `3 -> 5`.
  - List is now `dummy -> 2 -> 1 -> 4 -> 3 -> 5`. Reset `pre = 3`, `cur = 3`.
- **Iteration 3:**
  - Advance `cur` `2` steps from `3`: step 1 reaches `5`, step 2 reaches `null`.
  - `cur == null` triggers `return dummy.next` -> `[2, 1, 4, 3, 5]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Every node is visited at most twice: once when `cur` advances to measure a `k`-group, and at most once inside `reverseList`.
- **Space Complexity:** `O(1)` — Only a fixed set of pointer variables (`dummy`, `pre`, `cur`, `t`, `start`, `p`, `q`) is used regardless of `n` or `k`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [25reverse-nodes-in-k-group.java](./25reverse-nodes-in-k-group.java) |

---

## Key Learnings

- Null-terminating a sublist (`cur.next = null`) lets you reuse standard `reverseList` logic without off-by-one boundary bugs.
- A `dummy` sentinel node eliminates special-case logic for updating the overall `head` during the very first `k`-group reversal.
- Before reversing `start`, saving `start = pre.next` gives you direct `O(1)` access to the reversed group's new tail.
